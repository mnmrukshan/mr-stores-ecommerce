import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  sizes: { type: [String], default: ['S', 'M', 'L', 'XL'] },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model('Product', productSchema);
