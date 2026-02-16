const express = require('express');
const router  = express.Router()
const {productreg} = require('../controllers/product')

router.post('/product',productreg)


