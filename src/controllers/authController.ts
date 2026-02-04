import { prisma } from "config/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { generateToken } from "utils/generateToken";

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  //has the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const token = generateToken(user.id);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email,
        name,
      },
      token,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  //if user not exists
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const token = generateToken(user.id);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email,
        name: user.name,
      },
      token,
    },
  });
};

export const logout = async (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
