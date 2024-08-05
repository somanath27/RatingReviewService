import { HttpException } from '@exceptions/HttpException';
import bcrypt from 'bcryptjs';
import { UserModel, TokenModel } from '@models/index';

import {
  generateTokensObject,
  generateUserTokenPayload
} from '@/helpers/token.helper';

export default class AuthService {
  private userModel = UserModel;
  private tokenModel = TokenModel;
  private saltRounds = 10;

  public async userRegister(userInput: { email: string; password: string }) {
    try {
      const { email, password } = userInput;

      const existingUser = await this.userModel.findOne({ email });

      if (existingUser) {
        throw new HttpException(400, 'Email already exists!');
      }

      const salt = bcrypt.genSaltSync(this.saltRounds);
      const encryptedPassword = bcrypt.hashSync(password, salt);

      const newUser = new this.userModel({
        email,
        password: encryptedPassword
      });

      await newUser.save();

      const userPayload = generateUserTokenPayload(newUser);
      const tokens = generateTokensObject(userPayload);

      // Save the tokens
      await new this.tokenModel({ userId: newUser._id, ...userPayload }).save();

      return { user: userPayload, tokens };
    } catch (err) {
      if (err.code === 11000) {
        throw new HttpException(400, 'Email already exists!');
      }
      throw new HttpException(
        err.status || 500,
        err.message || 'Something went wrong'
      );
    }
  }

  public async userLogin(userInput: { email: string; password: string }) {
    try {
      const { email, password } = userInput;

      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw new HttpException(400, 'Invalid email or password');
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        throw new HttpException(400, 'Invalid email or password');
      }
      // Generate token payload and tokens
      const userPayload = generateUserTokenPayload(user);
      const tokens = generateTokensObject(userPayload);

      return { user: userPayload, tokens };
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err.message || 'Something went wrong'
      );
    }
  }
}
