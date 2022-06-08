import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    imageUrl: { type: String },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number },
    description: { type: String },
    isSale: { type: Boolean , default: false},
    information: {
      type: Array,
      colorId: { type: String },
      sizeId: { type: String },
      salePrice: { type: Number },
      purchasePrice: { type: Number },
      retailPrice: { type: Number },
    },
  },
  {
    timestamps: true,
  },
);
