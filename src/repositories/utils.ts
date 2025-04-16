import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const errorPrismaHandler = (error: unknown) => {
	if (error instanceof PrismaClientKnownRequestError) {
		console.error("Prisma error:", error.message);
		throw new Error(`Erro ao buscar veículo: ${error.message}`);
	}
	console.error("Unexpected error:", error);
	throw new Error("Erro inesperado ao buscar veículo");
};
