import { randomUUID } from "node:crypto";

export interface ITeste {
	name: string;
}

class Teste {
	id?: string;
	name!: string;

	constructor() {
		if (!this.id) {
			this.id = randomUUID();
		}
	}
}

export { Teste };
