const Product = require("../database/models/productSchema")
const express = require('express');
const router = express.Router()
const mongoose = require("mongoose");
const { Category } = require("../database/models/category");

router.post("/",async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(401).json({ success: false, message: "Invalid category" });
    }
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    });
    product = await product.save();
    if (!product) {
        return res.status(401).json({ success: false, message: "Product not found" });
    }
    product = await Product.findById(product._id).populate('category');
    return res.status(201).json({ success: true, message: "Product created successfully", product });

})
module.exports= router