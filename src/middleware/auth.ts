/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { Response } from "express";

const verifyToken = (req: any, res: Response, next: any) => {
  let token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }

  jwt.verify(token, String(process.env.AUTH_KEY), (err: any, decoded: any) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

// const isOperator =

const authJwt = {
  verifyToken: verifyToken,
};

export default authJwt;
