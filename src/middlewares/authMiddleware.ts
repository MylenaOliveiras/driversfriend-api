import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const authHeader = req.headers.authorization;

	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined");
	}

	if (!authHeader) {
		res.status(401).json({ message: "Token não fornecido" });
		return;
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
		res.status(401).json({ message: "Token inválido ou expirado" });
		return;
	}
};
