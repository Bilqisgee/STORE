import mongoose from "mongoose";

// Modelling how the product is going to be
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Corrected the key
    },
    price: {
      type: Number,
      required: true, // Corrected the key
    },
    image: {
      type: String,
      required: true, // Corrected the key
    },
  },
  {
    timestamps: true, // Correctly placed the options
  }
);

 const Product = mongoose.model("Product", productSchema);


export default Product;
