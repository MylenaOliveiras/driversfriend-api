import type { NextFunction, Request, Response } from "express";
import { ZodError, z } from "zod";

enum FUEL {
	GASOLINA = "GASOLINA",
	DIESEL = "DIESEL",
	GNV = "GNV",
	ELETRICO = "ELETRICO",
	FLEX = "FLEX",
	HIBRIDO = "HIBRIDO",
}

enum TIPO_VEICULO {
	CARRO = "CARRO",
	MOTO = "MOTO",
	CAMINHAO = "CAMINHAO",
	ONIBUS = "ONIBUS",
	VAN = "VAN",
}

const vehicleSchema = z.object({
	id: z.number().int(),
	marca: z.number().int(),
	modelo: z.string(),
	cor: z.string(),
	anoModelo: z.number().int(),
	anoFabricacao: z.number().int(),
	placaVeiculo: z.string(),
	kmInicial: z.number().int().min(0),
	dataCadastro: z.string().datetime(),
	tipo_combustivel: z.nativeEnum(FUEL),
	tipo_veiculo: z.nativeEnum(TIPO_VEICULO),
	usuarioId: z.number().int(),
});

const vehicleSchemaSimple = vehicleSchema.pick({
	id: true,
	marca: true,
	modelo: true,
});

const newVehicleSchema = vehicleSchema.omit({ id: true, usuarioId: true });

export const validateVehicles = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const data = newVehicleSchema.parse(req.body);
		req.body = data;
		next();
	} catch (error) {
		if (error instanceof ZodError) {
			const formattedErrors = error.errors.map((err) => ({
				field: err.path.join("."),
				message: err.message,
			}));

			res.status(400).json({
				message: "Validation failed",
				errors: formattedErrors,
			});
		}

		next(error);
	}
};

export type INewVehicle = z.infer<typeof newVehicleSchema>;
export type IVehicle = z.infer<typeof vehicleSchema>;
export type IVehicleSimple = z.infer<typeof vehicleSchemaSimple>;
