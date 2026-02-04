import jwt from "jsonwebtoken";
import { prisma } from "config/prisma";
import type { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization?.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "Error",
      message: "Unauthorized Action, Token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      return res
        .status(401)
        .json({ status: "Error", message: "Unauthorized, Invalid token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ status: "error", message: "Unauthorized error" });
  }
};
