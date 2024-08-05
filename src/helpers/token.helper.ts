import {
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenExpiry,
  getRefreshTokenExpiry
} from '@/globals/jwt.global';
import { TokenPayload } from '@interfaces/index';

export const generateUserTokenPayload = user => {
  const payload: TokenPayload = {
    id: user.id
  };
  return payload;
};

export const generateTokensObject = userPayload => {
  return {
    accessToken: generateAccessToken(userPayload),
    refreshToken: generateRefreshToken(userPayload),
    accessExpiryTime: getAccessTokenExpiry(),
    refreshExpiryTime: getRefreshTokenExpiry()
  };
};
