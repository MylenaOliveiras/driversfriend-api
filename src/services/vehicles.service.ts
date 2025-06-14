import type { $Enums, veiculos } from "@prisma/client";
import { VehiclesRepository } from "../repositories/vehicles.repository";
import type {
	IBrand,
	INewVehicle,
	IVehicleSimple,
	VEHICLE_TYPE,
} from "../schemas/vehicles.schema";
import { AppError } from "../utils/AppError";

export class VehiclesService {
	static validateOwnership(
		vehicle: veiculos | null | undefined,
		userId: number,
	): void {
		if (!vehicle) {
			throw new AppError("Veículo não encontrado", 404);
		}

		if (vehicle.USUARIO_ID !== userId) {
			throw new AppError("Veículo não pertence ao usuário", 403);
		}
	}

	static async list(userId: number): Promise<IVehicleSimple[]> {
		if (!userId || userId === 0) {
			throw new AppError("Usuário não identificado", 400);
		}

		const vehicles = await VehiclesRepository.findVehiclesByUserId(userId);

		const formattedVehiclesList = vehicles?.map((vehicle) => ({
			id: vehicle.ID,
			marca: vehicle.MARCA_ID || 0,
			modelo: vehicle.MODELO,
		}));

		return formattedVehiclesList || [];
	}

	static async create(userId: number, vehicleData: INewVehicle) {
		if (!userId || userId === 0) {
			throw new AppError("Usuário não identificado", 400);
		}
		const registeredVehicle = await VehiclesRepository.findByLicensePlate(
			vehicleData.placaVeiculo,
		);

		if (registeredVehicle) {
			throw new AppError(
				"Já existe um veículo cadastrado com esta placa.",
				409,
			);
		}

		const now = new Date();
		const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
		const isoLocal = localDate.toISOString();

		const data = {
			...vehicleData,
			dataCadastro: isoLocal,
		};

		await VehiclesRepository.create(userId, data);

		return "Veículo cadastrado com sucesso";
	}

	static async delete(userId: number, vehicleId: string) {
		const vehicleIdParsed = Number.parseInt(vehicleId);

		const vehicle = await VehiclesRepository.findById(vehicleIdParsed);

		if (!userId || userId === 0) {
			throw new AppError("Usuário não identificado", 400);
		}

		VehiclesService.validateOwnership(vehicle, userId);

		await VehiclesRepository.delete(vehicleIdParsed);

		return "Veículo excluído com sucesso";
	}

	static async update(
		userId: number,
		vehicleId: string,
		vehicleData: INewVehicle,
	) {
		const vehicleIdParsed = Number.parseInt(vehicleId);

		const vehicle = await VehiclesRepository.findById(vehicleIdParsed);
		VehiclesService.validateOwnership(vehicle, userId);

		const registeredVehicle = await VehiclesRepository.findByLicensePlate(
			vehicleData.placaVeiculo,
		);

		if (registeredVehicle && registeredVehicle.ID !== vehicleIdParsed) {
			throw new AppError(
				"Já existe um veículo cadastrado com esta placa.",
				409,
			);
		}

		await VehiclesRepository.update(vehicleIdParsed, vehicleData);

		return "Veículo atualizado com sucesso";
	}

	static async findById(userId: number, vehicleId: string) {
		const vehicleIdParsed = Number.parseInt(vehicleId);
		const vehicle = await VehiclesRepository.findById(vehicleIdParsed);
		VehiclesService.validateOwnership(vehicle, userId);

		const formattedVehiclesList = {
			id: vehicle?.ID,
			marca: vehicle?.MARCA_ID,
			modelo: vehicle?.MODELO,
			cor: vehicle?.COR,
			anoModelo: vehicle?.ANO_MODELO,
			anoFabricacao: vehicle?.ANO_FABRICACAO,
			placaVeiculo: vehicle?.PLACA_VEICULO,
			kmInicial: vehicle?.KM_INICIAL,
			dataCadastro: vehicle?.DATA_CADASTRO,
			tipoVeiculo: vehicle?.TIPO_VEICULO,
			combustivel: vehicle?.TIPO_COMBUSTIVEL,
		};

		return formattedVehiclesList;
	}

	static async getBrands(vehicleType?: VEHICLE_TYPE) {
		let brands: Awaited<ReturnType<typeof VehiclesRepository.getBrands>>;

		if (vehicleType) {
			brands = await VehiclesRepository.getBrands(vehicleType);
		} else {
			brands = await VehiclesRepository.getAllBrands();
		}

		return brands?.map((b) => ({
			id: b.ID,
			nome: b.NOME,
		}));
	}
}
