import { prisma } from "config/prisma";
import type { Request, Response } from "express";

export const CreateTaskController = async (req: Request, res: Response) => {
  const userID = req.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ status: "error", message: "UnAuthorized, User not found" });
  }

  const { title, content } = req.body;

  const createdTask = await prisma.tasks.create({
    data: {
      title,
      content,
      userID,
    },
  });

  res.status(200).json(createdTask);
};

export const tasksListController = async (req: Request, res: Response) => {
  const userID = req.user?.id;

  if (!userID) {
    return res
      .status(401)
      .json({ status: "error", message: "UnAuthorized, User not found" });
  }

  const tasks = await prisma.tasks.findMany({ where: { userID: userID } });

  res.status(200).json(tasks);
};
