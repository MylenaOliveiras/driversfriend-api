import { prisma } from "../../prisma/prismaClient";
import type { IFuelingResponse } from "../schemas/fueling.schema";
import { errorPrismaHandler } from "./utils";

export class FuelingRepository {
	static async create(vehicleId: number, fuelingData: IFuelingResponse) {
		try {
			return await prisma.abastecimentos.create({
				data: {
					KM_ATUAL: fuelingData.kmAtual,
					VEICULO_ID: vehicleId,
					DATA_ABASTECIMENTO: fuelingData.dataAbastecimento,
					VALOR_TOTAL: fuelingData.valorTotal,
					VALOR_UNITARIO: fuelingData.valorUnitario,
					ENERGIA_CONSUMIDA: fuelingData.energiaConsumida,
					LITROS_ABASTECIDOS: fuelingData.litrosAbastecidos,
					OBSERVACAO: fuelingData.observacao,
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async findByVehicle(vehicleId: number) {
		try {
			return await prisma.abastecimentos.findMany({
				where: {
					VEICULO_ID: vehicleId,
				},
				orderBy: {
					DATA_ABASTECIMENTO: "asc",
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async delete(fuelingId: number) {
		try {
			await prisma.abastecimentos.delete({
				where: {
					ID: fuelingId,
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}
}
