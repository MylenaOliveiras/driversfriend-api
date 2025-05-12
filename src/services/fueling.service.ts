import { FuelingRepository } from "../repositories/fueling.repository";
import type {
	IFuelingListResponse,
	IFuelingRequest,
	IFuelingResponse,
} from "../schemas/fueling.schema";
import { FUEL } from "../schemas/vehicles.schema";
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
			await FuelingRepository.findByVehicle(vehicleIdParsed);

		const lastFueling = findLastFueling
			? findLastFueling[findLastFueling.length - 1]
			: null;

		if (lastFueling && data.kmAtual <= lastFueling.KM_ATUAL) {
			throw new AppError(
				"A quilometragem atual não pode ser menor ou igual que a última abastecida.",
				400,
			);
		}

		if (data.kmAtual <= (vehicle?.kmInicial ?? 0)) {
			throw new AppError(
				"A quilometragem atual não pode ser menor ou igual que a inicial.",
				400,
			);
		}

		const total =
			vehicle.combustivel === FUEL.ELETRICO
				? (data.energiaConsumida || 0) * data.valorUnitario
				: (data.litrosAbastecidos || 0) * data.valorUnitario;

		const fuelingData: IFuelingResponse = {
			...data,
			valorTotal: total,
		};

		await FuelingRepository.create(vehicleIdParsed, fuelingData);

		return fuelingData;
	}

	static async listByVehicle(
		userId: number,
		vehicleId: string,
	): Promise<IFuelingListResponse> {
		const vehicle = await VehiclesService.findById(userId, vehicleId);
		const fuelings = await FuelingRepository.findByVehicle(vehicle.id || 0);

		if (!fuelings || fuelings.length === 0) {
			return [];
		}

		const formattedFuelingsList = fuelings.map((fueling) => ({
			id: fueling.ID,
			dataAbastecimento: fueling.DATA_ABASTECIMENTO
				? fueling.DATA_ABASTECIMENTO.toISOString()
				: "",
			valorTotal: Number(fueling.VALOR_TOTAL),
			valorUnitario: Number(fueling.VALOR_UNITARIO),
			litrosAbastecidos: Number(fueling.LITROS_ABASTECIDOS),
			energiaConsumida: Number(fueling.ENERGIA_CONSUMIDA),
			kmAtual: fueling.KM_ATUAL,
			observacao: fueling.OBSERVACAO,
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
