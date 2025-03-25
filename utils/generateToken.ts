import jwt from "jsonwebtoken";

export function generateToken(userID: number) {
	if (!process.env.JWT_SECRET) {
		throw new Error("JWT_SECRET is not defined");
	}
	return jwt.sign({ id: userID }, process.env.JWT_SECRET, {
		expiresIn: "1d",
	});
}
