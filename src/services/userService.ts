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

  async login(email: string, password: string) {
    return userRepository.login(email, password );
  }

  async getAllUsers() {
    return userRepository.getAllUsers();
  }

  async updatecart(id: number, itemid: number, itemcount: number ){ //UPDATE CART
    return userRepository.updatecart(id,itemid,itemcount);
  }

  async updateUser(id: number, name?: string, email?: string, password?: string) {
    // You might want to hash the password here
    return userRepository.updateUser(id, { name, email, password });
  }

  async deleteUser(id: number) {
    return userRepository.deleteUser(id);
  }
    

}
