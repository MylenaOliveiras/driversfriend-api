import express from "express";

const app = express();
const port = 5000;

app.get("/", (_req, res) => {
	res.send("Hello, World");
});

app.listen(port, () => {
	// biome-ignore lint/suspicious/noConsole: <explanation>
	console.log(`App de exemplo esta rodando na porta ${port}`);
});
