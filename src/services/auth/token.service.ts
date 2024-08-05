import { HttpException } from '@/exceptions/HttpException';
import { TokenModel } from '@models/index';

export default class TokenService {
  private tokenModel = TokenModel;

  public async storeUserTokens(
    userId: string,
    tokens: {
      accessToken: string;
      refreshToken: string;
      accessExpiryTime: string;
      refreshExpiryTime: string;
    }
  ) {
    try {
      const { accessToken, refreshToken, accessExpiryTime, refreshExpiryTime } =
        tokens;

      return await this.tokenModel.updateOne(
        { userId: Object(userId) },
        {
          accessToken,
          refreshToken,
          accessExpiryTime,
          refreshExpiryTime
        },
        { upsert: true }
      );
    } catch (err) {
      throw new HttpException(
        err.status || 500,
        err?.message || 'Something went wrong'
      );
    }
  }
}
