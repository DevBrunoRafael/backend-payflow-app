import { SignInController } from "../controllers/SignInController";
import { SignUpController } from "../controllers/SignUpController";
import { Router } from "express";

const authRoutes = Router();

authRoutes.post("/register", new SignUpController().createUser);
authRoutes.post("/login", new SignInController().signIn);
authRoutes.get("/authenticated/:_id", new SignInController().authenticatedUser);

export default authRoutes;
