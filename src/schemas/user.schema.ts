import { z } from "zod";

export const UserSchema = z
	.object({
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
		confirmacaoSenha: z.string(),
	})
	.refine((data) => data.senha === data.confirmacaoSenha, {
		message: "Senhas não conferem",
		path: ["confirmPassword"],
	});

export const validateUser = (data: unknown) => {
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

export type User = z.infer<typeof UserSchema>;
