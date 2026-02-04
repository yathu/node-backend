import { login, logout, register } from "@controllers/authController";
import express from "express";

const authRouter = express();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);

export default authRouter;
