import { Router } from "express";
import { VehiclesController } from "../controllers/vehicles.controller";
import { validateVehicle } from "../schemas/vehicles.schema";

const vehiclesRoutes = Router();

vehiclesRoutes.get("/", VehiclesController.list);
vehiclesRoutes.post("/", validateVehicle, VehiclesController.create);

vehiclesRoutes.delete("/:vehicleId", VehiclesController.delete);
vehiclesRoutes.put("/:vehicleId", validateVehicle, VehiclesController.update);

vehiclesRoutes.get("/:vehicleId", VehiclesController.findById);

export default vehiclesRoutes;
