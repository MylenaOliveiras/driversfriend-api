import { Router } from "express";

const router = Router();

router.get("/users", (_req, res) => {
	res.json({ message: "Hello, World!" });
});
