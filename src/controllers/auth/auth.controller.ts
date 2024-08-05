import { Request, Response } from 'express';
import { AuthService } from '@services/index';
import catchAsync from '@utils/async';
import * as ApiResponse from '@utils/ApiResponse';

export default class AuthController {
  private userAuth = new AuthService();

  /**
   * @desc        Create User
   * @route       GET api/v1/app/create
   * @access      Private
   * @returns     Returns Successful Message
   */
  public userRegister = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const registerData = await this.userAuth.userRegister(req.body);
      ApiResponse.successResponseWithData(
        res,
        'Registration Sucessful',
        registerData
      );
    }
  );

  public userLogin = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const data = await this.userAuth.userLogin(req.body);
      ApiResponse.successResponseWithData(res, 'Successfully Logged In', data);
    }
  );
}
