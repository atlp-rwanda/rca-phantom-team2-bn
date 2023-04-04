import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { IRequest } from "../../types";

export const verifyToken = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || token.replace("Bearer", "").trim().length < 10)
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      status: 401,
    });

  token = token.replace("Bearer", "").trim();

  try {
    const decoded = jwt.verify(
      token,
      String(process.env.AUTH_KEY)
    ) as JwtPayload;
    req.auth = {
      userId: decoded.userId,
      roleId: decoded.roleId,
    };
    return next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
      status: 401,
    });
  }
};
