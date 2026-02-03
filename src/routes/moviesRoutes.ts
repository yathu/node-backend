import express, { type Request, type Response } from "express";

const moviesRouter = express();

moviesRouter.get("/list", (req: Request, res: Response) => {
  res.json({ message: "Movies List" });
});

moviesRouter.post("/list", (req: Request, res: Response) => {
  res.json({ message: "Movies Post" });
});


export default moviesRouter;