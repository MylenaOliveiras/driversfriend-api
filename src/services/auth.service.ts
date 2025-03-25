import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { UserRepository } from "../repositories/user.repository";
import type { INewUser, ISimplifyUser } from "../schemas/user.schema";
import { AppError } from "../utils/AppError";

export class AuthService {
	static async login({ email, senha }: ISimplifyUser) {
		const user = await UserRepository.find(email);

		const isPasswordCorrect = user && (await bcrypt.compare(senha, user.SENHA));

		if (!user || !isPasswordCorrect) {
			throw new AppError("E-mail ou senha incorretos", 401);
		}

		const token = generateToken(user.ID);
		return token;
	}

	static async register(data: INewUser) {
		const user = await UserRepository.find(data.email);

		if (user) {
			throw new AppError("E-mail já cadastrado", 400);
		}

		const hashedPassword = await bcrypt.hash(data.senha, 10);
		const newUser = await UserRepository.create({
			...data,
			senha: hashedPassword,
		});

		return newUser;
	}
}
