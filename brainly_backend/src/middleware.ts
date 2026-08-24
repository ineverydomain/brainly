import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, JWT_PASSWORD);
  if (decoded) {
    if (typeof decoded === "string") {
      res.status(403).json({
        message: "you are not logged in",
      });
      return;
    }

    req.userId = decoded.id;
    next();
  } else {
  }
};
