import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware";
import { errorHandler } from "./middlewares/errorHandlers";
import authRoutes from "./routes/auth.routes";
import vehiclesRoutes from "./routes/vehicles.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
	res.json({
		message: "Welcome to the DriversFriend API!",
		status: "Running",
		version: "1.0.0",
	});
});
app.use("/auth", authRoutes);
app.use("/vehicles", authMiddleware, vehiclesRoutes);

app.use(errorHandler);
app.use((req, res) => {
	res.status(404).json({
		message: "Route not found",
	});
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(`Server running on port ${PORT}`);
});
