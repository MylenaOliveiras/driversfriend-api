import type { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
	static async login(req: Request, res: Response) {
		const { email, senha } = req.body;
		const token = await AuthService.login(email, senha);
		res.json({ token });
	}
}
