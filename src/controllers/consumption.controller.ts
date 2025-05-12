import type { NextFunction, Request, Response } from "express";
import { ConsumptionService } from "../services/averageConsumption.service";

export class ConsumptionController {
	static async calc(req: Request, res: Response, next: NextFunction) {
		try {
			const vehicleId = req.params.vehicleId;
			const userId = req.user?.id ?? 0;

			const consumoMedio = await ConsumptionService.calcAverageConsumption(
				userId,
				vehicleId,
			);

			res.status(200).json(consumoMedio);
		} catch (err) {
			next(err);
		}
	}
}
