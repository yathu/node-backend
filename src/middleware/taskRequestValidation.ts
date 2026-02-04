import type { Request, Response, NextFunction } from "express";
import z, { ZodObject } from "zod";
import type { ZodSchema } from "zod/v3";

export const validateCreateTaskRequest = (schema: ZodObject) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errorMsg = z.prettifyError(result.error);
      return res.status(400).json(errorMsg);
    }
    next();
  };
};
