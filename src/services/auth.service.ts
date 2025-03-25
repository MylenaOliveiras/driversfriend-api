import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
	static async login(email: string, senha: string) {
		const user = await UserRepository.find(email);
		if (!user) {
			throw new Error("Invalid credentials");
		}
		const isPasswordValid = await bcrypt.compare(senha, user.SENHA);

		if (!user || !isPasswordValid) {
			throw new Error("Invalid credentials");
		}

		const token = generateToken(user.ID);
		return token;
	}
}
