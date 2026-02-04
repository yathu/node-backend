import express from "express";
import tasksRouter from "@routes/tasksRouter";
import authRouter from "@routes/authRouter";

const app = express();

app.use(express.json()); //for body
app.use(express.urlencoded({ extended: true })); //for form field

app.use("/tasks", tasksRouter);
app.use("/auth", authRouter);

const PORT = 5001;

const server = app.listen(PORT, () => {
  console.log("test node");
});
