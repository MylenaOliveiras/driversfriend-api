import { prisma } from "../../prisma/prismaClient";

export class VehiclesRepository {
	static async find(user_id: number) {
		return prisma.veiculos.findMany({
			where: {
				USUARIO_ID: user_id,
			},
		});
	}
}
