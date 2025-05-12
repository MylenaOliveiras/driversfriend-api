import type { IFuelingListResponse } from "../schemas/fueling.schema";
import { FUEL } from "../schemas/vehicles.schema";
import { FuelingService } from "./fueling.service";
import { VehiclesService } from "./vehicles.service";

export class ConsumptionService {
	static async calcAverageConsumption(userId: number, vehicleId: string) {
		const vehicle = await VehiclesService.findById(userId, vehicleId);
		const fuelings = await FuelingService.listByVehicle(userId, vehicleId);

		if (vehicle.combustivel === FUEL.ELETRICO) {
			return calcularConsumoEletrico(vehicle.kmInicial, fuelings);
		}

		return calcularConsumo(vehicle.kmInicial, fuelings);
	}
}

function calcularConsumo(
	kmInicial: number | undefined,
	fuelings: IFuelingListResponse,
) {
	if (!fuelings || fuelings.length < 2) {
		return {
			mediaTotal: 0,
			series: [],
		};
	}

	let totalKmRodado = 0;
	let totalLitros = 0;
	const series = [];

	for (let i = 0; i < fuelings.length; i++) {
		const atual = fuelings[i];
		const kmAnterior = i === 0 ? kmInicial : fuelings[i - 1].kmAtual;

		const kmRodado = atual.kmAtual - (kmAnterior ?? 0);
		const litros = atual.litrosAbastecidos || 0;

		if (kmRodado > 0 && litros > 0) {
			const consumo = kmRodado / litros;

			series.push({
				data: atual.dataAbastecimento
					? new Date(atual.dataAbastecimento).toISOString()
					: null,
				kmRodado,
				litros,
				consumoMedio: Number.parseFloat(consumo.toFixed(2)),
			});

			totalKmRodado += kmRodado;
			totalLitros += litros;
		}
	}

	const mediaTotal =
		totalLitros > 0
			? Number.parseFloat((totalKmRodado / totalLitros).toFixed(2))
			: 0;

	return {
		mediaTotal,
		series,
	};
}

function calcularConsumoEletrico(
	kmInicial: number | undefined,
	fuelings: IFuelingListResponse,
) {
	if (!fuelings || fuelings.length < 2) {
		return {
			mediaTotal: 0,
			series: [],
		};
	}

	let totalKmRodado = 0;
	let totalKwh = 0;
	const series = [];

	for (let i = 0; i < fuelings.length; i++) {
		const atual = fuelings[i];
		const kmAnterior = i === 0 ? kmInicial : fuelings[i - 1].kmAtual;

		const kmRodado = atual.kmAtual - (kmAnterior ?? 0);
		const kWh = atual.energiaConsumida || 0;

		if (kmRodado > 0 && kWh > 0) {
			const consumo = kmRodado / kWh;

			series.push({
				data: atual.dataAbastecimento
					? new Date(atual.dataAbastecimento).toISOString()
					: null,
				kmRodado,
				kWh,
				consumoMedio: Number.parseFloat(consumo.toFixed(2)),
			});

			totalKmRodado += kmRodado;
			totalKwh += kWh;
		}
	}

	const mediaTotal =
		totalKwh > 0 ? Number.parseFloat((totalKmRodado / totalKwh).toFixed(2)) : 0;

	return {
		mediaTotal,
		series,
	};
}
