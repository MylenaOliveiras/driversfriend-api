import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

export const UserSchema = z.object({
	id: z.number(),
	nome: z.string(),
	cpf: z.string(),
	email: z.string().email("E-mail inválido"),
	senha: z
		.string()
		.min(6, "Senha deve ter no mínimo 6 caracteres")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Senha deve conter letras maiúsculas, minúsculas e números",
		),
});

export const SimplifyUserSchema = UserSchema.pick({ email: true }).extend({
	senha: z.string(),
});

export const validateNewUser = (data: unknown) => {
	try {
		const user = UserSchema.parse(data);
		return user;
	} catch (error) {
		if (error instanceof z.ZodError) {
			throw new Error(error.errors.map((err) => err.message).join("\n"));
		}
		throw error;
	}
};

export const validateLogin = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const loginData = SimplifyUserSchema.parse(req.body);
		req.body = loginData;
		next();
	} catch (error) {
		if (error instanceof z.ZodError) {
			res.status(400).json({ errors: error.errors.map((err) => err.message) });
		} else {
			next(error);
		}
	}
};

export type IUser = z.infer<typeof UserSchema>;
export type ILogin = z.infer<typeof SimplifyUserSchema>;
