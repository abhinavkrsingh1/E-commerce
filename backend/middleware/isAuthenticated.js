const User = require("../database/models/userModels");
const jwt = require("jsonwebtoken");
const isAuthenticated = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({success:false,message: "Unauthorized token is missing or invalid"});
        }
        const token = authHeader.split(" ")[1];
        console.log("Token received:", token);
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded JWT:", decoded);
        } catch (error) {
            console.log("JWT verification error:", error);
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ success: false, message: "The token has expired" });
            } else {
                return res.status(401).json({ success: false, message: "Invalid token" });
            }
        }
        if (!decoded || !decoded.id) {
            console.log("Decoded is undefined or missing id.");
            return res.status(401).json({ success: false, message: "Invalid token payload" });
        }
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        req.user=user;
        req.id = user._id;
        next();
                
    } catch (error) {
        return res.status(500).json({success:false,message: "Server Error",error:error.message});
        
    }}
    const isAdmin = async (req, res, next) => {
        try {
            if(req.user && req.user.role === "admin"){
                next();
            } else {
                return res.status(403).json({success:false,message: "Forbidden: Admins only"});
            }
            
        } catch (error) {
                return res.status(500).json({success:false,message: "Server Error",error:error.message});
            
        }

    }

    module.exports = { isAuthenticated, isAdmin };