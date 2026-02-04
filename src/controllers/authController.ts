import { prisma } from "config/prisma";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";

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

  res.status(201).json({
    success: true,
    data: {
      user: {
        id: user.id,
        email,
        name,
      },
    },
  });
};
