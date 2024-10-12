import { PrismaClient, Item } from '@prisma/client';

const prisma = new PrismaClient();

export class ItemRepository {

//Create
  async createItem(data: { name: string; description: string;stock:number; price: number;special_price:number}): Promise<Item> {
   return prisma.item.create({ 
    data,
  });
 }


//Read
  async getItemById(id: number): Promise<Item | null> {
    return prisma.item.findUnique({
      where: { id },
    });
  }

  async getAllItems(): Promise<Item[]> {
    return prisma.item.findMany();
  }

//Update
  async updateItem(id: number, data: Partial<{ name: string; description: string;stock:number; price: number;special_price:number}>): Promise<Item> {
    return prisma.item.update({
      where: { id },
      data,
    });
}

//Delete 
  async deleteItem(id: number): Promise<Item> {
    return prisma.item.delete({
      where: { id },
    });
  }



}
