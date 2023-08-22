import { NextFunction, Request, Response } from 'express';
import { CustomError } from 'express-handler-errors';

const ErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errStatus = err.error?.status || 500;
  const errMsg = err.error?.message || 'Something went wrong';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export default ErrorHandler;
