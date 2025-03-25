import type {
	ErrorRequestHandler,
	NextFunction,
	Request,
	Response,
} from "express";
import { AppError } from "../utils/AppError";

export const errorHandler: ErrorRequestHandler = (
	err: AppError,
	_req,
	res,
	_next,
): void => {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({ message: err.message });
	} else {
		res.status(500).json({ message: "Erro interno do servidor" });
	}
};
