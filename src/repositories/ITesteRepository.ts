import type { ITeste } from "../entities/Teste";

interface ITesteRepository {
	register(teste: ITeste): Promise<void>;
}
export type { ITesteRepository };
