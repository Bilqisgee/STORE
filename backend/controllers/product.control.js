import Product from "../models/product.js";
import mongoose from "mongoose";


export const getProducts = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in getting  products:", error.message);
        res.status(500).json({success: false, message: "Server error"})
    }
    
    
    }


    export const createProduct =  async (req, res) => {
        const product = req.body // user will send this data
    
        if (!product.name || !product.price || !product.image) {
            return res.status(400).json({ success: false, message: "Please provide all fields" })
        }
        const newProduct = new Product(product);
    
        try {
            await newProduct.save(); // saving the product await= wait for thr save operation to complete before continuing
            res.status(201).json({ success: true, data: newProduct });
        } catch (error) {
            console.log("Error in create product:", error);
        }
    
    }

    export const updateProduct = async (req, res) => {
        const {id} = req.params; // specifying an id 
     const product = req.body; // selecting what you want to update
    
    
     // when the id is invalid when updating a product you use this
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "invalid product id"})
    }
    
    
    try {
     const updatedProduct = await  Product.findByIdAndUpdate(id, product, {new: true}) 
      // If no product was found with that ID, return an error
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }

      res.status().json({ success: true, data: updatedProduct})
    } catch (error) {
        res.status(500).json({ success: false, message:  "Server error"});
    }
    }

    export const deleteProduct = async (req, res) => {

        const { id } = req.params; //
    
        if (!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({ success: false, message: "invalid product id"})
        }


        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json({ success: true, message: "Product deleted successfully" });
        } catch (error) {
            console.log("Error in delete Product:", error);
            res.status(500).json({ success: false, message: "Server error" });
        }
    }