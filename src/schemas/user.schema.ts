import { z } from "zod";
import { validateSchema } from "./utils";

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

export const NewUserSchema = UserSchema.omit({ id: true });
export const SimplifyUserSchema = UserSchema.pick({ email: true }).extend({
	senha: z.string(),
});

export const validateNewUser = validateSchema(NewUserSchema);
export const validateLogin = validateSchema(SimplifyUserSchema);

export type IUser = z.infer<typeof UserSchema>;
export type INewUser = z.infer<typeof NewUserSchema>;
export type ISimplifyUser = z.infer<typeof SimplifyUserSchema>;
