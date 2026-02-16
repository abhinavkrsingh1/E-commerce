const express = require('express');
const router1  = express.Router()
const {productreg,getProduct} = require('../controllers/product')
const {isAuthenticated} = require('../middleware/isAuthenticated')

router1.post('/product',productreg );
router1.get('/getpro',isAuthenticated, getProduct);

module.exports=router1;


