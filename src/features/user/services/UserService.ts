import { AppDataSource } from "../../../config/database";
import { User } from "../entities/User";
import { UserAdvance } from "../entities/UserAdvance";
import { UserRepository } from "../repositories/UserRepository";
import crypto from "crypto";
import bcrypt from "bcrypt";

export class UserService {
  // CREATE
  async createUser(data: any) {
    // Khởi tạo queryRunner để thực hiện SQL Transaction
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = new User();
      user.userName = data.userName;
      
      // Hash password (mã hóa mật khẩu)
      if (data.pass) {
        user.pass = await bcrypt.hash(data.pass, 10);
      } else {
        user.pass = null;
      }

      // Tự động sinh UUID
      user.uuid = crypto.randomUUID();
      
      user.fullName = data.fullName;
      user.email = data.email || null;
      user.phoneNumber = data.phoneNumber || null;
      
      const savedUser = await queryRunner.manager.save(user);

      // Lưu UserAdvance nếu có data
      if (data.userAdvance) {
        const userAdvance = new UserAdvance();
        userAdvance.userId = savedUser.userId;
        userAdvance.user = savedUser;
        userAdvance.address = data.userAdvance.address || null;
        userAdvance.dob = data.userAdvance.dob || null;
        userAdvance.profileUrl = data.userAdvance.profileUrl || null;
        
        await queryRunner.manager.save(userAdvance);
      }

      // Commit Transaction nếu tất cả đều thành công
      await queryRunner.commitTransaction();
      
      return await this.getUserById(savedUser.userId); // Trả về data sau khi lưu kèm relation
    } catch (err) {
      // Rollback nếu có bất kỳ lỗi nào xảy ra
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // Giải phóng queryRunner
      await queryRunner.release();
    }
  }

  // READ ALL
  async getAllUsers() {
    return await UserRepository.find({
      relations: ["userAdvance"]
    });
  }

  // READ ONE
  async getUserById(id: number) {
    return await UserRepository.findOne({
      where: { userId: id },
      relations: ["userAdvance"]
    });
  }

  // UPDATE
  async updateUser(id: number, updateData: Partial<User>) {
    const dataToUpdate = { ...updateData };
    
    // Nếu có update mật khẩu, tiến hành mã hóa lại
    if (dataToUpdate.pass) {
      dataToUpdate.pass = await bcrypt.hash(dataToUpdate.pass, 10);
    }
    
    await UserRepository.update(id, dataToUpdate);
    return this.getUserById(id);
  }

  // DELETE
  async deleteUser(id: number) {
    return await UserRepository.delete(id);
  }
}
