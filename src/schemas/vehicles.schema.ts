import { z } from "zod";
import { validateSchema } from "./utils";

export enum FUEL {
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
	combustivel: z.nativeEnum(FUEL),
	dataCadastro: z.string().datetime().nullish(),
	tipoVeiculo: z.nativeEnum(TIPO_VEICULO),
	usuarioId: z.number().int(),
});

const vehicleSchemaSimple = vehicleSchema.pick({
	id: true,
	marca: true,
	modelo: true,
});

const newVehicleSchema = vehicleSchema.omit({ id: true, usuarioId: true });

export const validateVehicle = validateSchema(newVehicleSchema);

export type INewVehicle = z.infer<typeof newVehicleSchema>;
export type IVehicle = z.infer<typeof vehicleSchema>;
export type IVehicleSimple = z.infer<typeof vehicleSchemaSimple>;
