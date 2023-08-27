import { Product } from '../models/Product.model.js';

export const getAllProducts = async (req, res) => {
    try {
        const allProducts = await Product.find();
        res.status(200).json(allProducts);
    } catch (error) {
        res.status(404).json({error: 'No se encontraron datos de productos'});
    }
}

export const addProduct = async (req , res) => {
    try {
        const newProduct = req.body;
        const product = new Product(newProduct);
        const saveProduct= await product.save();
        res.status(201).json({message: `El producto ${saveProduct.title} ha sido creado con éxito.`})
    } catch (error) {
        res.status(500).json({message: 'No se pudo agregar el producto', error: error});
    }
}