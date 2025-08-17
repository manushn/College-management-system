const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require("bcryptjs");
require('dotenv').config();


const otpStore = {};

function GenerateOtp() {
    return crypto.randomInt(100000, 999999).toString();
}

async function sendOtp(email, prefix,firstname,lastname,username) {
    let otp = GenerateOtp();
    
    otpStore[username] = {
        otp: otp,
        expiresAt: Date.now() + (5 * 60 * 1000) 
    };
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nicetonline@gmail.com',
            pass: process.env.GMAIL_KEY, 
        },
    });

    let mailOptions = {
        from: 'nicetonline@gmail.com',
        to: email,
        subject: `Hi ${prefix} ${firstname} ${lastname}, Verification OTP Fom NICETECH`,
        text: `Your OTP is ${otp} to create your password. Don't Share your OTP and PASSWORDS with anyone.`,
    };

    try {
        await transporter.sendMail(mailOptions);
        
        
        return true;
    } catch (error) {
        console.error('Error sending OTP:', error);
        return false;
    }
}

router.post('/createotp',async(req,res)=>{
    const username=req.body.username;
    const db=req.db;
    if(!username){
        return res.status(203).json({emessage:"Username not entered"})
    }

    try{
        db.query('SELECT * FROM staff WHERE username = ?',[username],async(error,result)=>{
            if(result.length===0){
                return res.status(203).json({emessage:"User does not exists!"})
            }
            const userDate=result[0];
            const  otpSent = sendOtp(userDate.email,userDate.prefix,userDate.first_name,userDate.last_name,userDate.username)

            if(otpSent){
                return res.status(200).json({isOtp:true})
            }else{
                return res.status(500).json({isotp:false})
            }

        })

    }catch(error){
        console.log("error in create otp:",error)
        return res.status(500).json({ erroruser: "Error in creating otp:", error });
    }
});

router.put('/verifyotp',async(req,res)=>{
    const {username,otp,password}=req.body;
    const db=req.db;

    if(!username||!otp||!password){
        return res.status(203).json({emessage:"All fields are required"})
    }

    const storedOtp=otpStore[username];

    if (!storedOtp) {
        return res.status(400).json({ emessage: "OTP not found. Please request a new OTP." });
    }

    if (Date.now() > storedOtp.expiresAt) {
        delete otpStore[username]; 
        return res.status(203).json({ emessage: "OTP has expired. Please request a new OTP." });
    }

    if(otp==storedOtp.otp){
        const hashedPassword =await bcrypt.hash(password,10);
        try{

            db.query(`UPDATE users SET password = ? WHERE username = ?`,[hashedPassword, username],(error)=>{
                if (error) {
                  console.error("Error Updating password into users:", error);
                  return res.status(203).json({
                    emessage: "Error updating password",
                  });
                }else{
                     delete otpStore[username];
                     return res.status(200).json({ success: true });
                }
            });
           

        }catch(err){
            console.error("Error in verifying otp:",err)
            return res.status(500).json({emessage:"Unable to update user details"})
        }
    }else{
        return res.status(203).json({emessage:"Invalid Otp!"})
    }
})

module.exports=router;

