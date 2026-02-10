const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken');
const verifyEmail = (token, email) => {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw Error('Invalid email address format');
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });
    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        text: `Hi! There, You have recently visited 
               our website and entered your email.
               Please follow the given link to verify your email
               http://localhost:5173/verify/${token} 
               Thanks`
    };
    transporter.sendMail(mailConfigurations, function(error, info){
        if (error) throw Error(error);
        console.log('Email Sent Successfully');
        console.log(info);
    });
}

module.exports = verifyEmail;


