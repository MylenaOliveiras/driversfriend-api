import { FuelingRepository } from "../repositories/fueling.repository";
import type {
	IFuelingRequest,
	IFuelingResponse,
} from "../schemas/fueling.schema";
import { AppError } from "../utils/AppError";
import { VehiclesService } from "./vehicles.service";

export class FuelingService {
	static async create(
		userId: number,
		vehicleId: string,
		data: IFuelingRequest,
	) {
		const vehicle = await VehiclesService.findById(userId, vehicleId);

		const vehicleIdParsed = Number(vehicleId);

		const findLastFueling =
			await FuelingRepository.findLastFueling(vehicleIdParsed);

		if (findLastFueling && data.kmAtual <= findLastFueling.KM_ATUAL) {
			throw new AppError(
				"A quilometragem atual não pode ser menor que a última abastecida.",
				400,
			);
		}

		if (data.kmAtual <= (vehicle?.kmInicial ?? 0)) {
			throw new AppError(
				"A quilometragem atual não pode ser menor que a inicial.",
				400,
			);
		}

		const total = data.litrosAbastecidos * data.precoLitro;

		const fuelingData: IFuelingResponse = {
			...data,
			valorTotal: total,
		};

		await FuelingRepository.create(vehicleIdParsed, fuelingData);
	}

	static async listByVehicle(userId: number, vehicleId: string) {
		const vehicle = await VehiclesService.findById(userId, vehicleId);
		const fuelings = await FuelingRepository.findByVehicle(vehicle.id || 0);

		if (!fuelings || fuelings.length === 0) {
			throw new AppError("Nenhum abastecimento encontrado.", 400);
		}

		const formattedFuelingsList = fuelings.map((fueling) => ({
			id: fueling.ID,
			dataAbastecimento: fueling.DATA_ABASTECIMENTO,
			valorTotal: fueling.VALOR_TOTAL,
			precoLitro: fueling.PRECO_LITRO,
			litrosAbastecidos: fueling.LITROS_ABASTECIDOS,
			tipoCombustivel: fueling.TIPO_COMBUSTIVEL,
		}));

		return formattedFuelingsList;
	}

	static async delete(userId: number, vehicleId: string, fuelingId: string) {
		await VehiclesService.findById(userId, vehicleId);
		const fuelings = FuelingService.listByVehicle(userId, vehicleId);

		const foundFueling = (await fuelings).find(
			(f) => f.id === Number(fuelingId),
		);

		if (!foundFueling) {
			throw new AppError("Abastecimento não encontrado.", 404);
		}

		await FuelingRepository.delete(foundFueling.id);
	}
}
