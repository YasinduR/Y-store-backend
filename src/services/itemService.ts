import { ItemRepository } from "../repositories/itemRepository";

const itemRepository = new ItemRepository();

export class ItemService {


  async createItem(name: string, description: string,stock:number, price: number,special_price:number,images:string[]) {
    // You might want to hash the password here
    return itemRepository.createItem({ name, description, stock,price,special_price,images });
  }

  async updateItem(id: number, name?: string, description?: string,stock?:number, price?: number,special_price?:number,images?:string[]) {
    // You might want to hash the password hereimage
    return itemRepository.updateItem(id, { name, description, stock,price,special_price,images });
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
