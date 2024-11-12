import { Prisma, PrismaClient, User,Item } from '@prisma/client';


const prisma = new PrismaClient();

export class UserRepository {
  async createUser(data: { firstname: string; lastname: string; address: string; hometown: string ;email: string; password: string  }): Promise<User | null> {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
  
    if (existingUser) {
      // Email already exists, return null or throw an error
      console.log("Email already exists");
      return null;
    }
  
    // If email doesn't exist, create a new user
    return prisma.user.create({
      data,
    });
  }

  async getUserById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });

  }

  async removeItemsFromCart(id: number, itemIds: number[]) { // Remove Items from usercarts after succsessfull purchase

    const user = await prisma.user.findUnique({
      where: { id }
    });
  
    if (user && user.cart) {
      // Copy the current cart items
      let updatedCart = user.cart as Array<{ itemid: number; itemcount: number }>;
  
      // Filter out items with itemids that are in the itemIds array
      updatedCart = updatedCart.filter(item => !itemIds.includes(item.itemid));
  
      // Update the user's cart in the database
      return prisma.user.update({
        where: { id },
        data: {
          cart: updatedCart,
        },
      });
    } else {
      // No cart exists or invalid user
      return null;
    }
  }


  async updatecart(id: number,  itemid: number, itemcount: number ) {
    
    const product = await prisma.item.findUnique({
      where: { id: itemid}
      
    }); 
    // Update only if valid product ID
    if(product){
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
    
    updatedCart = updatedCart.filter(item => item.itemcount >= 1 && Number.isInteger(item.itemcount));
    // Maintain positive integers as itemcount in the cart
    
    // Update the user's cart with the updated items
    return prisma.user.update({
      where: { id },
      data: {
        cart: updatedCart,
      },
    });}
    else{
      return null;
    }
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
