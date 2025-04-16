import z from "zod";
import { validateSchema } from "./utils";
import { FUEL } from "./vehicles.schema";

const fuelingSchema = z.object({
	id: z.number(),
	veiculoId: z.number(),
	dataAbastecimento: z.string().datetime(),
	precoLitro: z.number().min(1),
	litrosAbastecidos: z.number().min(1),
	tipoCombustivel: z.nativeEnum(FUEL),
	kmAtual: z.number().int().min(0),
});

const fuelingSchemaSimple = fuelingSchema.pick({
	id: true,
	litrosAbastecidos: true,
	dataAbastecimento: true,
});

const fuelingSchemaRequest = fuelingSchema.omit({
	id: true,
	veiculoId: true,
});

const fuelingSchemaResponse = fuelingSchemaRequest.extend({
	valorTotal: z.number().min(10),
});

export const validateFueling = validateSchema(fuelingSchemaRequest);

export type IFuelingResponse = z.infer<typeof fuelingSchemaResponse>;
export type IFuelingRequest = z.infer<typeof fuelingSchemaRequest>;
export type IFueling = z.infer<typeof fuelingSchema>;
export type IFuelingSimple = z.infer<typeof fuelingSchemaSimple>;
