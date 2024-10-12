import { ItemRepository } from "../repositories/itemRepository";

const itemRepository = new ItemRepository();

export class ItemService {


  async createItem(name: string, description: string,stock:number, price: number,special_price:number) {
    // You might want to hash the password here
    return itemRepository.createItem({ name, description, stock,price,special_price });
  }

  async updateItem(id: number, name?: string, description?: string,stock?:number, price?: number,special_price?:number) {
    // You might want to hash the password here
    return itemRepository.updateItem(id, { name, description, stock,price,special_price });
  }

  async getItemById(id: number) {
    return itemRepository.getItemById(id);
  }

  async getAllItems() {
    return itemRepository.getAllItems();
  }

  async deleteItem(id: number) {
    return itemRepository.deleteItem(id);
  }


}
