import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { validateLogin } from "../schemas/user.schema";

const authRoutes = Router();

authRoutes.post("/login", validateLogin, AuthController.login);

export default authRoutes;
