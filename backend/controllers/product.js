const Product  = require('../database/models/productSchema')
const productreg = async (req,res)=>{
    const {name , description,price,category} = req.body;
    if(!name || !description || !price || ! category){
        return res.status(401).json({success:false,message:"All field are required"})
    }
    const productname = await Product.findOne({name})
    if(productname){
        return res.status(401).json({success:true, message:"name already exist "})
    }
    const newPrdosuct = await Product.create({
        name,
        description,
        price,
        category
    })
    newPrdosuct.save()
    return res.status(201).json({success:true , message:"All product are created ",product:newPrdosuct})

}
const getProduct = async (req,res)=>{
    const userId = req.params.id;
    const productget = await Product.findOne({userId})
    if(!productget){
     
        return res.status(401).json({success:false,message:"product not found"})

    }
    return res.status(201).json({success:true,message:"product get successfully",productget})


}

module.exports={productreg,getProduct}