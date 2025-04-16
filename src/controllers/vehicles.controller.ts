import type { NextFunction, Request, Response } from "express";
import { VehiclesService } from "../services/vehicles.service";

export class VehiclesController {
	static async list(req: Request, res: Response, next: NextFunction) {
		try {
			const loggedUser = req.user?.id || 0;
			const vehiclesList = await VehiclesService.list(loggedUser);

			res.json(vehiclesList);
		} catch (err) {
			next(err);
		}
	}

	static async create(req: Request, res: Response, next: NextFunction) {
		try {
			const loggedUser = req.user?.id || 0;
			const vehicleData = req.body;
			const vehicle = await VehiclesService.create(loggedUser, vehicleData);
			res.status(201).json(vehicle);
		} catch (err) {
			next(err);
		}
	}

	static async delete(req: Request, res: Response, next: NextFunction) {
		try {
			const loggedUser = req.user?.id || 0;
			const vehicleId = req.params.vehicleId;
			await VehiclesService.delete(loggedUser, vehicleId);

			res.status(204);
		} catch (err) {
			next(err);
		}
	}

	static async update(req: Request, res: Response, next: NextFunction) {
		try {
			const loggedUser = req.user?.id || 0;
			const vehicleId = req.params.vehicleId;
			const vehicleData = req.body;
			const vehicle = await VehiclesService.update(
				loggedUser,
				vehicleId,
				vehicleData,
			);
			res.status(200).json(vehicle);
		} catch (err) {
			next(err);
		}
	}

	static async findById(req: Request, res: Response, next: NextFunction) {
		try {
			const loggedUser = req.user?.id || 0;
			const vehicleId = req.params.vehicleId;
			const vehicle = await VehiclesService.findById(loggedUser, vehicleId);
			res.status(200).json(vehicle);
		} catch (err) {
			next(err);
		}
	}
}
