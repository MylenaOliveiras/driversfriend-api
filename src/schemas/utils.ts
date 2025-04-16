import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodSchema } from "zod";

const formatZodError = (error: ZodError) => {
	const formattedErrors = error.errors.map((err) => ({
		field: err.path.join("."),
		message: err.message,
	}));
	return {
		message: "Validation error",
		errors: formattedErrors,
	};
};

export const validateSchema =
	(schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = schema.parse(req.body);
			req.body = data;
			next();
		} catch (error) {
			if (error instanceof ZodError) {
				const formattedErrors = formatZodError(error);
				res.status(400).json(formattedErrors);
			} else {
				res.status(500).json({
					message: "Internal server error",
				});
			}
		}
	};
