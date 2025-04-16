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
					PRECO_LITRO: fuelingData.precoLitro,
					LITROS_ABASTECIDOS: fuelingData.litrosAbastecidos,
					TIPO_COMBUSTIVEL: fuelingData.tipoCombustivel,
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
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async findLastFueling(vehicleId: number) {
		try {
			return await prisma.abastecimentos.findFirst({
				where: {
					VEICULO_ID: vehicleId,
				},
				orderBy: {
					DATA_ABASTECIMENTO: "desc",
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}
}
