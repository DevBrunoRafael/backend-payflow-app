import { SignInController } from "../controllers/SignInController";
import { SignUpController } from "../controllers/SignUpController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", new SignUpController().createUser);
authRoutes.post("/login", new SignInController().signIn);

export default authRoutes;
