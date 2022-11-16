import { Router } from "express";
import { UserController } from "../controllers/UserController";

const authRoutes = Router();
const userController = new UserController();

authRoutes.post("/register", userController.createUser);
authRoutes.post("/login", userController.login);
authRoutes.get("/teste", userController.getTest);

export default authRoutes;
