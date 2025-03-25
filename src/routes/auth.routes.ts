import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateLogin, validateNewUser } from "../schemas/user.schema";

const authRoutes = Router();

authRoutes.post("/login", validateLogin, AuthController.login);
authRoutes.post("/register", validateNewUser, AuthController.register);

export default authRoutes;
