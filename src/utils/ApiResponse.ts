import httpStatus from 'http-status';
import { Response } from 'express';

export const successResponse = (res: Response, msg: string) =>
  res.status(200).json({
    response: {
      status: true,
      responseCode: 200,
      message: msg
    }
  });

export const createdDataResponse = (res: Response, msg: string, data: object) =>
  res.status(httpStatus.CREATED).json({
    response: {
      status: true,
      responseCode: 201,
      message: msg
    },
    data
  });

export const successResponseWithData = (
  res: Response,
  msg: string,
  data: object
) =>
  res.status(200).json({
    response: {
      status: true,
      responseCode: 200,
      message: msg
    },
    data
  });

export const ErrorResponse = (res: Response, msg: string, data: object) =>
  res.status(401).json({
    response: {
      status: true,
      responseCode: 401,
      message: msg
    },
    data
  });

export const ErrorResponseWithData = (
  res: Response,
  msg: string,
  data?: object
) =>
  res.status(400).json({
    response: {
      status: false,
      responseCode: 400,
      message: msg
    },
    data
  });
