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
		const findVehicle = await VehiclesService.findById(userId, vehicleId);

		const vehicleIdParsed = Number(vehicleId);

		const findLastFueling =
			await FuelingRepository.findLastFueling(vehicleIdParsed);

		if (!findVehicle || vehicleIdParsed === 0) {
			throw new AppError("Veículo não encontrado.", 404);
		}

		if (findLastFueling && data.kmAtual <= findLastFueling.KM_ATUAL) {
			throw new AppError(
				"A quilometragem atual não pode ser menor que a última abastecida.",
				400,
			);
		}

		if (data.kmAtual <= (findVehicle?.kmInicial ?? 0)) {
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
}
