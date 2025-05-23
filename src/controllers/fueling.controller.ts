import type { NextFunction, Request, Response } from "express";
import { FuelingService } from "../services/fueling.service";

export class FuelingController {
	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const vehicleId = req.params.vehicleId;
			const userId = req.user?.id ?? 0;

			const fuelingData = req.body;
			const fueling = await FuelingService.create(
				userId,
				vehicleId,
				fuelingData,
			);
			res.status(201).json(fueling);
		} catch (error) {
			next(error);
		}
	}

	static async listByVehicle(req: Request, res: Response, next: NextFunction) {
		try {
			const vehicleId = req.params.vehicleId;
			const userId = req.user?.id ?? 0;

			const fuelingsList = await FuelingService.listByVehicle(
				userId,
				vehicleId,
			);

			res.status(200).json(fuelingsList);
		} catch (error) {
			next(error);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.user?.id ?? 0;
			const vehicleId = req.params.vehicleId;
			const fuelingId = req.params.fuelingId;

			await FuelingService.delete(userId, vehicleId, fuelingId);

			res.status(204).json({ message: "Abastecimento excluído com sucesso!" });
		} catch (error) {
			next(error);
		}
	}
}
