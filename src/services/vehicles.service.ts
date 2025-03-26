import { VehiclesRepository } from "../repositories/vehicles.repository";

export class VehiclesService {
	static async list(user_id: string) {
		const userId = Number.parseInt(user_id);
		const vehicles = await VehiclesRepository.find(userId);
		return vehicles;
	}
}
