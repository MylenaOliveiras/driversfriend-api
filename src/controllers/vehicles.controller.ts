import type { NextFunction, Request, Response } from "express";
import { VehiclesService } from "../services/vehicles.service";
import { AppError } from "../utils/AppError";

export class VehiclesController {
	static async list(req: Request, res: Response, next: NextFunction) {
		try {
			const userId = req.params.userId;
			const loggedUser = req.user?.id.toString();

			if (userId !== loggedUser) {
				throw new AppError("Unauthorized", 401);
			}
			const vehiclesList = await VehiclesService.list(userId);
			res.json(vehiclesList);
		} catch (err) {
			next(err);
		}
	}
}
