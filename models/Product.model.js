import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    fullDescription: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true }, // Category of the product (e.g., electronics, clothing, etc.)
    brand: { type: String }, // Brand of the product
    images: [{ type: String }], // Array of image URLs
    specifications: [{ type: String }], // Array of product specifications
    ratings: [{ userId: String, rating: Number }], // Array of user ratings
    reviews: [{ userId: String, reviewText: String }], // Array of user reviews
    tags: [{ type: String }], // Array of tags or keywords
    featured: { type: Boolean, default: false }, // Flag to mark products as featured
    createdAt: { type: Date, default: Date.now }, // Timestamp of product creation
    updatedAt: { type: Date } // Timestamp of last update
}, {versionKey: false})

export const Product = mongoose.model('products', productSchema);