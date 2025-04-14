import { prisma } from "../../prisma/prismaClient";
import type { INewUser } from "../schemas/user.schema";

export class UserRepository {
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

	static async find(email: string, cpf?: string) {
		return prisma.usuarios.findFirst({
			where: {
				OR: [{ EMAIL: email }, { CPF: cpf }],
			},
		});
	}
}
