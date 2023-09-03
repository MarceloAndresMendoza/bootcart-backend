import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
});

const cartItemSchema = new Schema({
    productId: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true },
});


const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: 'user'},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePicture: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    billingAddress: addressSchema, // Billing Address Data
    shippingAddress: addressSchema, // Shipping Address Data
    shoppingCart: [cartItemSchema], // Shopping Cart Array
});

export const User = mongoose.model('User', userSchema);
