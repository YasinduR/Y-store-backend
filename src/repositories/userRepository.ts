import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository {
  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });

    
  }

  async login(email: string, password: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
  
    // Check if user exists and the password matches
    if (user && user.password === password) {
      return user;
    }
  
    return null; // Return null if no user found or password doesn't match
  }


  async getAllUsers(): Promise<User[]> {
    return prisma.user.findMany();
  }

  async updateUser(id: number, data: Partial<{ name: string; email: string; password: string }>): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
