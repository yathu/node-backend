import { register } from "@controllers/authController";
import express from "express";

const authRouter = express();

authRouter.post('/register',register)

export default authRouter;
