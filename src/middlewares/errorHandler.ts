import type { NextFunction, Request, Response } from "express";

export function errorHandler(
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction,
) {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.error(err);
	res.status(500).json({ message: "Internal Server Error" });
}
