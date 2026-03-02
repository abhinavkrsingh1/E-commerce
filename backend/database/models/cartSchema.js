const Cart = require('../models/cartModels')
const Product = require('../models/productSchema')

exports.getCart = async (req,res)=>{
    try {
        const cart = await Cart.findOne({user:req.user._id}).populate('item.product')
        return res.json(cart || {items:[]})
        
    } catch (error) {
   return res.status(500).json({success:false,message:"Internal server error",error:error.message}) 
        
    }
}

exports.addToCart = async (req,res)=>{
    const {productId , quantity} = req?.body;
    try {
        if(!productId || !quantity){
            return res.status(401).json({success:false,message:"All field are required"})
        }
        
        
    } catch (error) {
        return res.status(500).json({success:false,message:"Internal server error",error:error.message})
        
    }
}