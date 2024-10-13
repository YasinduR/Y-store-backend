import { Prisma, PrismaClient, User } from '@prisma/client';

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

  async updatecart(id: number,  itemid: number, itemcount: number ) {
    // Fetch the current cart of the user
    const user = await prisma.user.findUnique({
      where: { id }
    });
    let updatedCart = [];
    const newItem = {itemid: itemid, itemcount: itemcount};
    console.log(newItem)
    if (user && user.cart) {
      // If a cart exists, copy its contents
      updatedCart = user.cart as Array<{ itemid: number; itemcount: number }>;
      // Check if the item already exists in the cart
      const itemIndex = updatedCart.findIndex((item) => item.itemid === itemid);
      
      if (itemIndex > -1) {
        // Item exists, replace it with the new one
        updatedCart[itemIndex] = newItem;
      } else {
        // Item does not exist, add it to the cart
        updatedCart.push(newItem);
        //console.log(newItem)
      }
    } else {
      // If no cart exists, start a new one with the new item
      updatedCart = [newItem];
    }
    // Update the user's cart with the updated items
    return prisma.user.update({
      where: { id },
      data: {
        cart: updatedCart,
      },
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
