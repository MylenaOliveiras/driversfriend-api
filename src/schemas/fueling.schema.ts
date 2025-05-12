import z from "zod";
import { validateSchema } from "./utils";

const fuelingSchema = z.object({
	id: z.number(),
	veiculoId: z.number(),
	dataAbastecimento: z.string(),
	valorUnitario: z.number().min(0.01),
	kmAtual: z.number().int().min(0),
	litrosAbastecidos: z.number().min(0.01).nullish(),
	energiaConsumida: z.number().nullish(),
	observacao: z.string().nullish(),
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

const fuelingListResponse = fuelingSchemaResponse
	.extend({
		id: z.number(),
	})
	.array();

export const validateFueling = validateSchema(fuelingSchemaRequest);

export type IFuelingResponse = z.infer<typeof fuelingSchemaResponse>;
export type IFuelingListResponse = z.infer<typeof fuelingListResponse>;
export type IFuelingRequest = z.infer<typeof fuelingSchemaRequest>;
export type IFueling = z.infer<typeof fuelingSchema>;
export type IFuelingSimple = z.infer<typeof fuelingSchemaSimple>;
