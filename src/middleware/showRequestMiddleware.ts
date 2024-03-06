import { NextFunction, Request, Response } from "express";

export const showRequest = (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    const strRequest = `${req.method} ${
      req.originalUrl
    } (${new Date().toISOString()})`;
    console.log(strRequest);
    next();
  };
  