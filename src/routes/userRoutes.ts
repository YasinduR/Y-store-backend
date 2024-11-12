import { Router } from 'express';
import { UserController } from '../controllers/userController';

const userController = new UserController();
const router = Router();

router.post('/users', userController.createUser);
router.post('/users/login', userController.Login);
router.post('/users/cart', userController.Updateitemcount);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.put('/users/:id', userController.updateUser);
router.put('/users/cart', userController.deleteUser);
router.put('/users/cart/removeitems', userController.removeItemsFromCart);

export default router;