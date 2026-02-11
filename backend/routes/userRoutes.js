const express = require('express');
const router = express.Router();
const { register, verify, reVerify,login,logout,forgotPassword,veriftOtp,ChnagePassword ,allUsers,getUserById,updateUser} = require('../controllers/userControllers');
const {isAuthenticated,isAdmin} = require('../middleware/isAuthenticated');
const { upload } = require('../middleware/multer');
router.post('/register', register);
router.post('/verify', verify);
router.post('/re-verify', reVerify);
router.post('/login', login);
router.post('/logout', isAuthenticated,logout);
router.post('/forgot',isAuthenticated, forgotPassword);
router.post('/verify-otp/:email', veriftOtp);
router.post('/change-password/:email', ChnagePassword);
router.get('/all-users',isAuthenticated, isAdmin, allUsers);
router.get('/user/:userId', getUserById);
router.put('/update/:id',isAuthenticated,upload,updateUser)


module.exports = router;