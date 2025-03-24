import mongoose, { Schema, Document } from 'mongoose';

// Определение интерфейса TypeScript для товара
export interface IProduct extends Document {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  inStock: boolean;
}

// Определение схемы товара
const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  imageUrl: { type: String },
  inStock: { type: Boolean, default: true },
});

// Экспортируем модель товара
const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
