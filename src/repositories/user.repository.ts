import { prisma } from "../../prisma/client";
import type { INewUser } from "../schemas/user.schema";

export class UserRepository {
	static async find(email: string) {
		return prisma.usuarios.findUnique({
			where: { EMAIL: email },
		});
	}

	static async create(payload: INewUser) {
		return prisma.usuarios.create({
			data: {
				NOME: payload.nome,
				CPF: payload.cpf,
				EMAIL: payload.email,
				SENHA: payload.senha,
			},
		});
	}
}
