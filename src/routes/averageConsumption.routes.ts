import { Router } from "express";
import { ConsumptionController } from "../controllers/consumption.controller";

const consumptionRouter = Router();

consumptionRouter.get("/:vehicleId", ConsumptionController.calc);

export default consumptionRouter;
