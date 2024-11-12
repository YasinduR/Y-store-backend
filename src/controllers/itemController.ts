import { Request, Response } from 'express';
import { ItemService } from '../services/itemService';

const itemService = new ItemService();

export class ItemController {
  

  async createItem(req: Request, res: Response) {
    try {
      const {  name, description, stock,price,special_price,images } = req.body;
      const item = await itemService.createItem( name, description, stock,price,special_price,images);
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the item.' });
    }
  }
  

  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {name, description, stock,price,special_price,images } = req.body;
      const item = await itemService.updateItem(Number(id), name, description, stock,price,special_price,images);
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the item.' });
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const item = await itemService.getItemById(Number(id));
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: 'item not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the item.' });
    }
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const items = await itemService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving item.' });
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await itemService.deleteItem(Number(id));
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the item.' });
    }
  }

// only Special_price will be updated acc to dicount provided in json body
  async applyDiscount(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { discount } = req.body; 
      // Discount percentage is provided in the request body

      // Fetch the item by ID
      const item = await itemService.getItemById(Number(id));

      if (!item) { 
        return res.status(404).json({ error: 'Item not found.' });
      }

      // Update the special price based on discount
      const special_price = (1 - discount) * item.price;

      // Update the item with the new special_price
      const updatedItem = await itemService.updateItem(Number(id), item.name, item.description, item.stock, item.price, special_price,item.images);

      res.json(updatedItem);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while applying the discount.' });
    }
  }

}