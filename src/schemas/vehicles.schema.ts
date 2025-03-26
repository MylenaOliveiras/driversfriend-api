import type { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { AppError } from "../utils/AppError";

const vehiclesSchema = z.object({
	id: z.number().int(),
	marca: z.number().int(),
	modelo: z.string(),
	cor: z.string(),
	anoModelo: z.number().int(),
	anoFabricacao: z.number().int(),
	placaVeiculo: z.string(),
	kmInicial: z.number().int(),
	dataCadastro: z.string(),
	combustivel: z.string(),
	usuarioId: z.number().int(),
});

export const validateVehicles = (
	req: Request,
	_res: Response,
	next: NextFunction,
) => {
	try {
		const data = vehiclesSchema.parse(req.body);
		req.body = data;
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new AppError(
				error.errors.map((err) => err.message).join("\n"),
				400,
			);
		}
		throw error;
	}
};
