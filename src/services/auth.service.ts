import bcrypt from "bcrypt";
import { generateToken } from "../../utils/generateToken";
import { UserRepository } from "../repositories/user.repository";
import type { INewUser, ISimplifyUser } from "../schemas/user.schema";
import { AppError } from "../utils/AppError";

export class AuthService {
	static async register(data: INewUser) {
		const registeredUser = await UserRepository.find(data.email, data.cpf);

		if (registeredUser) {
			throw new AppError(
				"E-mail ou CPF já estão em uso. Tente fazer login ou recupere sua senha.",
				400,
			);
		}

		const hashedPassword = await bcrypt.hash(data.senha, 10);

		await UserRepository.create({
			...data,
			senha: hashedPassword,
		});

		return "Usuário cadastrado com sucesso";
	}

	static async login({ email, senha }: ISimplifyUser) {
		const user = await UserRepository.find(email);
		const isPasswordCorrect = user && (await bcrypt.compare(senha, user.SENHA));

		if (!user || !isPasswordCorrect) {
			throw new AppError(
				"Credenciais inválidas. Verifique seu e-mail e senha e tente novamente.",
				401,
			);
		}
		const token = generateToken(user.ID);
		return {
			token,
			user: {
				id: user.ID,
				nome: user.NOME,
				email: user.EMAIL,
			},
		};
	}
}
