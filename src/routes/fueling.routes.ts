import { Router } from "express";
import { FuelingController } from "../controllers/fueling.controller";
import { validateFueling } from "../schemas/fueling.schema";

const fuelingRoutes = Router();

fuelingRoutes.post("/:vehicleId", validateFueling, FuelingController.create);

export default fuelingRoutes;
