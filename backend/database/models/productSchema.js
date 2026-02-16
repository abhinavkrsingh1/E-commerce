const mongoose = require('mongoose')

const ptSchema = mongoose.Schema({
   name:{
    type:String,
    require:true
   } ,
   description:{
    type:String,
    require:true
   },
   price:{
    type:String,
    require:true
   },
   category:{
    type:String,
    require:true
   }



})

const Product = mongoose.model('product',ptSchema)
module.exports = Product