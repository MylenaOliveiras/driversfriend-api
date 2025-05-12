import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const data = req.body;
			const newUser = await AuthService.register(data);
			res.json(newUser);
		} catch (err) {
			console.log("Erro no controller de autenticação:", err);
			return next(err);
		}
	}

	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, senha } = req.body;
			const response = await AuthService.login({ email, senha });
			res.json(response);
		} catch (err) {
			console.log("Erro no controller de autenticação:", err);
			return next(err);
		}
	}
}
