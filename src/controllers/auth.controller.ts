import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, senha } = req.body;
			const token = await AuthService.login(email, senha);
			return res.json({ token });
		} catch (err) {
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log("Erro no controller de autenticação:", err);
			return next(err);
		}
	}
}
