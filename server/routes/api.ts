import express, { IRouter, Request, Response } from 'express';
import Products from '../controllers/products';

const router: IRouter = express.Router();

router.get('/', (req: Request, res: Response) => res.send('API Works!'));
router.get('/products', Products);

export default router;
