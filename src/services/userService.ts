import { UserRepository } from "../repositories/userRepository";

const userRepository = new UserRepository();

export class UserService {
  async createUser(name: string, email: string, password: string) {
    // You might want to hash the password here
    return userRepository.createUser({ name, email, password });
  }

  async getUserById(id: number) {
    return userRepository.getUserById(id);
  }

  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async updateUser(id: number, name?: string, email?: string, password?: string) {
    // You might want to hash the password here
    return userRepository.updateUser(id, { name, email, password });
  }

  async deleteUser(id: number) {
    return userRepository.deleteUser(id);
  }
}