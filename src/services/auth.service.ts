import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { UserRepository } from "../repositories/user.repository";
import { AppError } from "../utils/AppError";

export class AuthService {
	static async login(email: string, senha: string) {
		const user = await UserRepository.find(email);

		const isPasswordCorrect = user && (await bcrypt.compare(senha, user.SENHA));

		if (!user || !isPasswordCorrect) {
			throw new AppError("E-mail ou senha incorretos", 401);
		}

		const token = generateToken(user.ID);
		return token;
	}
}
