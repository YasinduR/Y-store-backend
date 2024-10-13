import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await userService.createUser(name, email, password);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
  }

  async Updateitemcount(req: Request, res: Response) {  // update item count in cart
    try {
      const { id, itemid,itemcount } = req.body;
      const user = await userService.getUserById(Number(id));
      // Exclude the password field from the user object
      if(user){
        const user_ = await userService.updatecart(user.id,itemid,itemcount)
        const { password, ...userWithoutPassword } = user_;
        res.json(userWithoutPassword);
      }
      else{
       res.status(401).json({ error: 'Invalid email or password' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while login.' });
    }
  }

  async Login(req: Request, res: Response) { 
    try {
      const { email, password } = req.body;
      const user = await userService.login( email, password);
      // Exclude the password field from the user object
      if(user){
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      }
      else{
       res.status(401).json({ error: 'Invalid email or password' });
        
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while login.' });
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(Number(id));
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: 'User not found.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving the user.' });
    }
  }

  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while retrieving users.' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const user = await userService.updateUser(Number(id), name, email, password);
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.deleteUser(Number(id));
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the user.' });
    }
  }
}