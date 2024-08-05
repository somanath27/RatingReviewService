import * as jwt from 'jsonwebtoken';
import { format, addMinutes } from 'date-fns';
import tokenTypes from '@/types/token.types';
import { Response } from 'express';

const accessSecret = process.env.JWT_ACCESS_TOKEN_SECRET;
const refreshSecret = process.env.JWT_ACCESS_TOKEN_SECRET;

const accessExpiryTime = {
  expiresIn: +process.env.JWT_ACCESS_EXPIRATION_MINUTES || 2 * 24 * 60 * 60 // 2 days in seconds
};

const refreshExpiryTime = {
  expiresIn: +process.env.JWT_REFRESH_EXPIRATION_MINUTES || 7 * 24 * 60 * 60 // 7 days in seconds
};

const timeFormat = 'dd-MMM-yyyy hh:mm:ss a';
const todayDate = new Date();

export const generateAccessToken = payload => {
  return jwt.sign({ ...payload }, accessSecret, accessExpiryTime);
};

export const generateRefreshToken = payload => {
  return jwt.sign(
    { ...payload, type: tokenTypes.REFRESH },
    refreshSecret,
    refreshExpiryTime
  );
};

export const getAccessTokenExpiry = () => {
  return format(addMinutes(todayDate, +accessExpiryTime.expiresIn), timeFormat);
};

export const getRefreshTokenExpiry = () => {
  return format(
    addMinutes(todayDate, +refreshExpiryTime.expiresIn),
    timeFormat
  );
};

// async function jwtVerify(token: any) {
//     try {
//         return jwt.verify(token, accessSecret);
//     } catch (e) {
//         return false;
//     }
// }

export const addCookiesToResponse = async (
  res: Response,
  newAccessToken: string,
  newRefreshToken: string
) => {
  res.cookie('accessToken', newAccessToken, {
    maxAge: 5 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });

  res.cookie('refreshToken', newRefreshToken, {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
};
