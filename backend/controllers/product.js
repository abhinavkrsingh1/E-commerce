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
router.get('/:id',async (req,res)=>{
    const product = await Product.findById(req.params.id)
    if(!product){
        return res.status(401).json({success:false,message:"id is not valid"})
    }
    return res.status(201).json({success:false,message:"ALL product",product})
})
router.put('/:id',async (req,res)=>{
    const product = await findById(req.params.id,{
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
      })
      if(!product){
        return res.status(400).json({success:false,message:"All fields are required"})
      }

      return res.status(201).json({success:true,message:"ALL fields are updated",product})
      
})
router.get('/:id',async (req,res)=>{

})
module.exports= router