import express, { type Request, type Response } from "express";
import moviesRouter from "./routes/moviesRoutes";

const app = express();

app.use('/movies',moviesRouter);

const PORT = 5001;

app.get("/test", (req: Request, res: Response) => {
  res.json({message:"get request"})
});

const server = app.listen(PORT, () => {
  console.log("test node");
});
