import { ProductController } from '../controllers/productController';

export class ProductService {
  private productController: ProductController;

  constructor() {
    this.productController = new ProductController();
  }

  async getProducts() {
    return this.productController.getProducts();
  }

  async createProduct(product: any) {
    return this.productController.createProduct(product);
  }

  async updateProduct(product: any) {
    return this.productController.updateProduct(product);
  }

  async deleteProduct(id: number) {
    return this.productController.deleteProduct(id);
  }
}

export default ProductService;