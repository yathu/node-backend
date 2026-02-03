import express, { type Request, type Response } from "express";

const app = express();

const PORT = 5001;

app.get("/test", (req: Request, res: Response) => {
  res.json({message:"get request"})
});

const server = app.listen(PORT, () => {
  console.log("test node");
});
