import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";

export const UserRepository = AppDataSource.getRepository(User).extend({
  // Nơi định nghĩa các custom Query Builder cho User entity nếu cần
});
