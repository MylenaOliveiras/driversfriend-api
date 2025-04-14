import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller";
import { validateVehicles } from "../schemas/vehicles.schema";

const vehiclesRoutes = Router();

vehiclesRoutes.get("/", VehiclesController.list);
vehiclesRoutes.post("/", validateVehicles, VehiclesController.create);

vehiclesRoutes.delete("/:vehicleId", VehiclesController.delete);
vehiclesRoutes.put("/:vehicleId", validateVehicles, VehiclesController.update);

vehiclesRoutes.get("/:vehicleId", VehiclesController.findById);

export default vehiclesRoutes;
