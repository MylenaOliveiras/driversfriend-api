import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma/prismaClient";
import type { INewVehicle } from "../schemas/vehicles.schema";

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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao buscar veículos: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao buscar veículos");
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao buscar veículo: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao buscar veículo");
		}
	}

	static async findByLicensePlate(licensePlate: string) {
		try {
			return prisma.veiculos.findUnique({
				where: {
					PLACA_VEICULO: licensePlate,
				},
			});
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao buscar veículo: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao buscar veículo");
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao criar veículo: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao criar veículo");
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao criar veículo: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao criar veículo");
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
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				console.error("Prisma error:", error.message);
				throw new Error(`Erro ao atualizar veículo: ${error.message}`);
			}
			console.error("Unexpected error:", error);
			throw new Error("Erro inesperado ao atualizar veículo");
		}
	}
}
