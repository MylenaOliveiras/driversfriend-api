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

app.use("/auth", authRoutes);

app.use(authMiddleware);

app.use("/vehicles", vehiclesRoutes);

app.use(errorHandler);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(`Server running on port ${PORT}`);
});
