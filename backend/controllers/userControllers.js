const User = require("../database/models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyEmail = require("../emailVaerify/verifyEmail");
const session = require("../database/models/sessionModels");
const sendOtpMail = require("../emailVaerify/sendOtp.mail");


const register = async(req, res) => {
    try {
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName || !email || !password){
            return res.status(400).json({success:false,message: "All fields are required"});
        }
        const user  = await User.findOne({email});
        if(user){
            return res.status(400).json({success:false,message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({firstName, lastName, email, password: hashedPassword});
        const token =jwt.sign({id:newUser._id}, process.env.JWT_SECRET, {expiresIn: '3h'});
        verifyEmail(token, email);
        newUser.token = token;
        await newUser.save();
         return res.status(201).json({success:true,message: "User registered successfully",user:newUser});
    } catch (error) {
        res.status(500).json({success:false,message: "Server Error",error:error.message});
    }
}
const verify = async(req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({success:false,message: "Unauthorized token is missing or invalid"});
        }
        const token = authHeader.split(" ")[1];
        let decoded
        try {
            decoded=jwt.verify(token,process.env.JWT_SECRET)
            
        } catch (error) {
            if(error.name ==="TokenExpiredError"){
                return res.status(401).json({success:false,message: "Token expired"});
            }
            return res.status(401).json({success:false,message: "Invalid token"});
            
        }
        const user = await User.findById(decoded.id);
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
        user.token=null;
        user.isVerified=true;
        await user.save();
        return res.status(200).json({success:true,message: "Email verified successfully"});

        
    } catch (error) {
        res.status(500).json({success:false,message: "Server Error",error:error.message});
    }
}

const reVerify = async(req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success:false,message: "Email is required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
        const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '3h'});
        verifyEmail(token, email);
        user.token = token;
        await user.save();
        return res.status(200).json({success:true,message: "Verification email sent again successfully",token});
         

        
    } catch (error) {
        res.status(500).json({success:false,message: "Server Error",error:error.message});
        
    }
}
const login = async(req, res) => {
    try {
        const {email, password} = req.body; 
        if(!email || !password){
            return res.status(400).json({success:false,message: "Email and password are required"});
        }   
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return res.status(404).json({success:false,message: "User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordValid){
            return res.status(401).json({success:false,message: "Invalid password"});
        }
        if(existingUser.isVerified==false){
            return res.status(401).json({success:false,message: "Email not verified"});
        }
        const accessToken = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET, {expiresIn: '10d'});
        const refreshToken = jwt.sign({id:existingUser._id}, process.env.JWT_SECRET, {expiresIn: '30d'});

        existingUser.isLoggedIn=true;
        await existingUser.save();  
        const existingSession = await session.findOne({userId:existingUser._id});
        if(existingSession){
            await session.deleteOne({userId:existingUser._id});
        }
        await session.create({userId:existingUser._id});
        return res.status(200).json({success:true,message:`welcome back ${existingUser.firstName}`,accessToken, refreshToken,user:existingUser});
      

    } catch (error) {
        res.status(500).json({success:false,message: "Server Error",error:error.message});
    }
}
const logout = async(req, res) => {
    try {
       const  userId = req.id;
       await session.deleteOne({userId});
       await User.findByIdAndUpdate(userId, {isLoggedIn:false});
       return res.status(200).json({success:true,message: "Logged out successfully"});

        
    } 
    catch (error) {
        return res.status(500).json({success:false,message: "Server Error",error:error.message});   
    }
}
const  forgotPassword = async(req, res) => {
    try {
        const {email} = req.body;
        if(!email){
            return res.status(400).json({success:false,message: "Email is required"});
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
        const otp = Math.floor(100000  + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        user.otp = otp;
        user.otpExpiry = otpExpiry;
        await user.save();
        sendOtpMail(otp, email);
        return res.status(200).json({success:true,message: "OTP sent to email"});



    }
    catch (error) {
        return res.status(500).json({success:false,message: "Server Error",error:error.message});   
    }
}
const veriftOtp = async(req, res) => {
   try {
     const {otp} =req.body;
     const email = req.params.email;
     if(!otp){
        return res.status(400).json({success:false,message: "OTP is required"});
     }
        const user = await User.findOne({email});
        if(!user.otp || !user.otpExpiry){
            return res.status(400).json({success:false,message: "OTP not found, please request a new one"});
        }
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
        if(user.otpExpiry < new Date()){
            return res.status(400).json({success:false,message: "OTP expired"});
        }
                if(user.otp !== otp){
            return res.status(400).json({success:false,message: "Invalid OTP"});
        }
        user.otp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({success:true,message: "OTP verified successfully"});
    



   } catch (error) {
    return res.status(500).json({success:false,message: "Server Error",error:error.message});
    
   }
    
}
const ChnagePassword = async(req, res) => {
    try {
        const {confirmPassword, newPassword} = req.body;
        const email = req.params.email;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
         
        if(newPassword !== confirmPassword){
            return res.status(400).json({success:false,message: "New password and confirm password do not match"});
        }
        const hashPassword = await bcrypt.hash(newPassword, 10);    
        user.password = hashPassword;
        await user.save();
        return res.status(200).json({success:true,message: "Password changed successfully"});

    } catch (error) {
        return res.status(500).json({success:false,message: "Server Error",error:error.message});   
}
}
const allUsers = async(_, res) => {
   try {
    const users = await User.find();
    return res.status(200).json({success:true,message: "All users retrieved successfully",users});

    
   } 
   catch (error) {
    return res.status(500).json({success:false,message: "Server Error",error:error.message});   

    
   } 
}
const getUserById= async(req,res)=>{
    try {
        const userId = req.params;
        const user = await User.findById(userId).select("-password -token -otp -otpExpiry");
        if(!user){
            return res.status(404).json({success:false,message: "User not found"});
        }
        return res.status(200).json({success:true,message: "User retrieved successfully",user});
        
    } catch (error) {
        return res.status(500).json({success:false,message: "Server Error",error:error.message});
        
    }
}
const updateUser = async (req, res) => {
    try {
        const userIdToUpdate = req.params.id;
        const loggedInUser = req.user;
        if (loggedInUser.role !== "admin" && loggedInUser._id.toString() !== userIdToUpdate) {
            return res.status(403).json({ success: false, message: "Forbidden action for non-admin users" });
        }

        const user = await User.findById(userIdToUpdate);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const { firstName, lastName, email, phoneNo, address, city, zipCode } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !phoneNo || !address || !city || !zipCode) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const updates = { firstName, lastName, email, phoneNo, address, city, zipCode };

        const updatedUser = await User.findByIdAndUpdate(userIdToUpdate, updates, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found after update" });
        }

        return res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Update user error:", error);
        return res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
module.exports = {
    register,
    verify,
    reVerify,
    login,
    logout,
    forgotPassword,
    veriftOtp,
    ChnagePassword,
    allUsers,
    getUserById,
    updateUser
}
