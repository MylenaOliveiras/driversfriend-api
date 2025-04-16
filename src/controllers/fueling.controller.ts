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
}
