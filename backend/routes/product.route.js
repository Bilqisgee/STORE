import express from "express";

import {createProduct, updateProduct, deleteProduct, getProducts} from "../controllers/product.control.js";


const router = express.Router();


router.get("/", getProducts);

 

router.post("/", createProduct)

router.put("/:id", updateProduct)


router.delete("/:id", deleteProduct)



export default router