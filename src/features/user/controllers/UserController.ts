import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.createUser(req.body);
      res.status(201).json(result);
    } catch (error) {
      console.error("UserController createUser error:", error);
      res.status(500).json({ error: "Thêm User. Đã có lỗi xảy ra." });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const result = await userService.getAllUsers();
      res.status(200).json(result);
    } catch (error) {
      console.error("UserController getAllUsers error:", error);
      res.status(500).json({ error: "Lấy danh sách người dùng. Đã có lỗi xảy ra." });
    }
  }

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await userService.getUserById(id);
      
      if (!result) {
        res.status(404).json({ error: "Người dùng không tồn tại." });
        return;
      }
      
      res.status(200).json(result);
    } catch (error) {
      console.error("UserController getUser error:", error);
      res.status(500).json({ error: "Lấy người dùng theo ID. Đã có lỗi xảy ra." });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      const result = await userService.updateUser(id, req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error("UserController updateUser error:", error);
      res.status(500).json({ error: "Cập nhật người dùng. Đã có lỗi xảy ra." });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id as string);
      await userService.deleteUser(id);
      res.status(200).json({ message: "Người dùng đã được xóa." });
    } catch (error) {
      console.error("UserController deleteUser error:", error);
      res.status(500).json({ error: "Xóa người dùng. Đã có lỗi xảy ra." });
    }
  }
}
