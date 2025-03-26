import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller";
import { validateVehicles } from "../schemas/vehicles.schema";

const vehiclesRoutes = Router();

vehiclesRoutes.get("/:userId", VehiclesController.list);

export default vehiclesRoutes;
