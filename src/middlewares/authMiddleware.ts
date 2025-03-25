import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export const authMiddleware = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!process.env.JWT_SECRET) {
		throw new AppError("JWT_SECRET is not defined", 500);
	}

	if (!authHeader) {
		throw new AppError("Token não fornecido", 401);
	}

	const token = authHeader.split(" ")[1]; // Formato: "Bearer TOKEN"

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		// @ts-ignore
		req.user = decoded;
		return next();
	} catch (err: unknown) {
		// biome-ignore lint/suspicious/noConsole: <explanation>
		console.error("Authentication error:", err);
		throw new AppError("Token inválido ou expirado", 401);
	}
};
