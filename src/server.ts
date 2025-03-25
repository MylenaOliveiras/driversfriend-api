import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(`Server running on port ${PORT}`);
});
