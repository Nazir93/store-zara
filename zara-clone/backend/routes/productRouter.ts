import express, { Request, Response } from 'express';
import ProductService from '../services/productService';

const router = express.Router();
const productService = new ProductService();

router.get('/products', async (req: Request, res: Response) => {
  const products = await productService.getProducts();
  res.json(products);
});

router.get('/products/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = await productService.getProductById(id);
  res.json(product);
});

router.post('/products', async (req: Request, res: Response) => {
  const product = req.body;
  const newProduct = await productService.createProduct(product);
  res.json(newProduct);
});

router.put('/products/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = req.body;
  const updatedProduct = await productService.updateProduct(product);
  res.json(updatedProduct);
});

router.delete('/products/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  await productService.deleteProduct(id);
  res.json({ message: 'Product deleted' });
});

router.get('/products/name/:name', async (req: Request, res: Response) => {
  const name = req.params.name;
  const product = await productService.getProductByName(name);
  res.json(product);
});

router.get('/products/category/:category', async (req: Request, res: Response) => {
  const category = req.params.category;
  const products = await productService.getProductsByCategory(category);
  res.json(products);
});

export default router;