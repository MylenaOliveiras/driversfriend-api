import type { IUser } from "../schemas/user.schema";

declare global {
	namespace Express {
		interface Request {
			user?: IUser;
		}
	}
}
