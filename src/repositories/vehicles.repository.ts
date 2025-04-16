import { prisma } from "../../prisma/prismaClient";
import type { INewVehicle } from "../schemas/vehicles.schema";
import { errorPrismaHandler } from "./utils";

export class VehiclesRepository {
	static async findVehiclesByUserId(user_id: number) {
		try {
			const vehicles = await prisma.veiculos.findMany({
				where: {
					USUARIO_ID: user_id,
				},
			});
			return vehicles;
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async findById(vehicleId: number) {
		try {
			const vehicle = await prisma.veiculos.findUnique({
				where: {
					ID: vehicleId,
				},
			});

			return vehicle;
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async findByLicensePlate(licensePlate: string) {
		try {
			const vehicle = await prisma.veiculos.findUnique({
				where: {
					PLACA_VEICULO: licensePlate,
				},
			});

			return vehicle;
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async create(user_id: number, vehicleData: INewVehicle) {
		try {
			const newVehicle = await prisma.veiculos.create({
				data: {
					USUARIO_ID: user_id,
					MARCA_ID: vehicleData.marca,
					MODELO: vehicleData.modelo,
					COR: vehicleData.cor,
					ANO_MODELO: vehicleData.anoModelo,
					ANO_FABRICACAO: vehicleData.anoFabricacao,
					PLACA_VEICULO: vehicleData.placaVeiculo,
					KM_INICIAL: vehicleData.kmInicial,
					DATA_CADASTRO: vehicleData.dataCadastro,
					TIPO_COMBUSTIVEL: vehicleData.tipo_combustivel,
					TIPO_VEICULO: vehicleData.tipo_veiculo,
				},
			});
			return newVehicle;
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async delete(vehicleId: number) {
		try {
			await prisma.veiculos.delete({
				where: {
					ID: vehicleId,
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}

	static async update(vehicleId: number, vehicleData: INewVehicle) {
		try {
			await prisma.veiculos.update({
				where: {
					ID: vehicleId,
				},
				data: {
					MARCA_ID: vehicleData.marca,
					MODELO: vehicleData.modelo,
					COR: vehicleData.cor,
					ANO_MODELO: vehicleData.anoModelo,
					ANO_FABRICACAO: vehicleData.anoFabricacao,
					PLACA_VEICULO: vehicleData.placaVeiculo,
					KM_INICIAL: vehicleData.kmInicial,
					DATA_CADASTRO: vehicleData.dataCadastro,
					TIPO_COMBUSTIVEL: vehicleData.tipo_combustivel,
					TIPO_VEICULO: vehicleData.tipo_veiculo,
				},
			});
		} catch (error) {
			errorPrismaHandler(error);
		}
	}
}
