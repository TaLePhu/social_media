import { DataSource } from "typeorm"
import { User } from "../features/user/entities/User"
import { UserAdvance } from "../features/user/entities/UserAdvance"

//cách1:
const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "my_typeormdb2",
    synchronize: true,
    entities: [User, UserAdvance],
})

/**
 * Cách 2: Dùng Migrations (Production-safe)
 */
// const AppDataSource = new DataSource({
//     type: "mysql",
//     host: "localhost",
//     port: 3306,
//     username: "root",
//     password: "123456",
//     database: "typeormdb",
//     entities: [User, UserAdvance],
//     synchronize: false,  // ← Không tự động
//     migrations: ["src/migrations/*.ts"],
//     migrationsRun: true,
// })

export const initializeDataSource = async () => {
  try {
    // Kiểm tra xem DataSource đã initialize chưa
    if (AppDataSource.isInitialized) {
      console.log("Data Source already initialized!")
      return
    }

    await AppDataSource.initialize()
    console.log("Data Source has been initialized!")
    console.log("Tables synchronized successfully!")
  } catch (error: any) {
    // Bỏ qua lỗi table đã tồn tại
    if (error.code === "ER_TABLE_EXISTS_ERROR") {
      console.log("Tables already exist")
    } else {
      console.error("Error during Data Source initialization", error)
    }
  }
}