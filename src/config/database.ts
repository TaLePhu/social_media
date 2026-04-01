import { DataSource } from "typeorm";
import { User } from "../features/user/entities/User";
import { UserAdvance } from "../features/user/entities/UserAdvance";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "123456",
  database: process.env.DB_NAME || "typeormdb_v1",
  synchronize: false,
  dropSchema: false, // Thêm dòng này: Nó sẽ xóa toàn bộ bảng và tạo lại mỗi khi app chạy
  logging: false,
  entities: [User, UserAdvance],
  migrations: ["src/migration/*.ts"],
});

export const initializeDataSource = async () => {
  if (AppDataSource.isInitialized) return;
  await AppDataSource.initialize();
  console.log("Data Source initialized");
};
