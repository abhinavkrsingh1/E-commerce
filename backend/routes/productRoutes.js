const express = require('express');
const router1  = express.Router()
const {productreg,getProduct} = require('../controllers/product')

router1.post('/product',productreg );
router1.get('/getpro',getProduct);

module.exports=router1;


