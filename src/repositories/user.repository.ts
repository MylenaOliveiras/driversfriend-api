import { prisma } from "../../prisma/prismaClient";
import type { INewUser } from "../schemas/user.schema";
import { errorPrismaHandler } from "./utils";

export class UserRepository {
	static async create(payload: INewUser) {
		try {
			return await prisma.usuarios.create({
				data: {
					NOME: payload.nome,
					CPF: payload.cpf,
					EMAIL: payload.email,
					SENHA: payload.senha,
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async find(email: string, cpf?: string) {
		try {
			return await prisma.usuarios.findFirst({
				where: {
					OR: [{ EMAIL: email }, { CPF: cpf }],
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}
}
