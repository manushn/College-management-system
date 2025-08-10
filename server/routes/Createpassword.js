const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const UserModel=require("../schemas/loginuserschema");
const bcrypt = require("bcryptjs");

const otpStore = {};

function GenerateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

async function sendOtp(email, name,username) {
    let otp = GenerateOtp();
    
    otpStore[username] = otp;
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nicetonline@gmail.com',
            pass: 'ghtc wkmn bubx eoyu', // Use environment variables for security
        },
    });

    let mailOptions = {
        from: 'nicetonline@gmail.com',
        to: email,
        subject: `Hi ${name}, Verification OTP Fom NICETECH`,
        text: `Your OTP code is ${otp} to create your password. Don't Share your OTP and PASSWORDS with anyone.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
}