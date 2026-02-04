import { CreateTaskController, tasksListController } from "@controllers/taskController";
import express, { type Request, type Response } from "express";
import { authMiddleware } from "middleware/authMiddleware";
import { validateCreateTaskRequest } from "middleware/taskRequestValidation";
import { createTaskSchema } from "validators/taskValidator";

const tasksRouter = express();

tasksRouter.use(authMiddleware);

tasksRouter.get("/", tasksListController)

tasksRouter.post("/",validateCreateTaskRequest(createTaskSchema),CreateTaskController)

export default tasksRouter;
 