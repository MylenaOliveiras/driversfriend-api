import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { UserRepository } from "../repositories/user.repository";

export class AuthService {
	static async login(email: string, senha: string) {
		const user = await UserRepository.find(email);
		if (!user) {
			throw new Error("Usuário não encontrado");
		}

		const isPasswordValid = await bcrypt.compare(senha, user.SENHA);
		if (!isPasswordValid) {
			throw new Error("Usuário não encontrado");
		}

		const token = generateToken(user.ID);
		return token;
	}
}
