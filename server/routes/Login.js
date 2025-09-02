const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenVerify = require("../middleware/tokenVerify");

require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

//----------------------------------------------------------------------------------------
router.post("/signup",async(req,res)=>{
    const db= req.db;
    const {username,password}=req.body;

    if(!username||!password){
        return res.status(203).json({emessage:"All fields are required!"})
    }

    try{

        db.query('SELECT * FROM users WHERE username=?',[username],async(error,result)=>{
            if(error) return res.status(500).json({emessage:"Database error",error:error});

            if(result.length>0){
                return res.status(203).json({emessage:"Username already exist"})
            }

            const hpassword= await bcrypt.hash(password,10);

            db.query('INSERT INTO users (username,password,role) VALUES (?,?,?)',[username,hpassword,"admin"],
                (error,result)=>{
                    if(error) return res.status(500).json({emessage:"Database error",error:error});

                    return res.status(201).json({message:"User created"})
                }
             )

        });

    }catch(error){
        console.log("Signup error:",error)
        return res.status(500).json({emessage:"server error"})
    }

});

//----------------------------------------------------------------------------------------

router.post("/login",async(req,res)=>{
    const db= req.db;
    const {username,password}=req.body;

    if(!username||!password){
        return res.status(203).json({emessage:"All fields are required!"})
    }

    try{

        db.query('SELECT * FROM users WHERE username=?',[username],async(error,result)=>{
            if(error) return res.status(500).json({emessage:"Database error",error:error});

            if (result.length === 0) {
                return res.status(203).json({ emessage: 'Invalid username' });
            }

            const userdata = result[0];

            const match = await bcrypt.compare(password, userdata.password);

            if (!match) {
                return res.status(203).json({ emessage: 'Invalid password' });
            }

            const token = jwt.sign(
                    { username: userdata.username, role: userdata.role },
                    JWT_KEY,
                    { expiresIn: '12h' });
            
            return res.status(201).json({success:true, token:token,role:userdata.role});

        });


    }catch(error){
        console.log("Signup error:",error)
        return res.status(500).json({emessage:"Login server error"})
    }
})
//----------------------------------------------------------------------------------------

router.post("/autologin",tokenVerify,async(req,res)=>{
    const db=req.db;
    const username=req.tokendata.username;
    const role=req.tokendata.role;

    try{
        db.query("SELECT * FROM users WHERE username=? AND role=?",[username,role],async(error,result)=>{
            if(error) return res.status(500).json({emessage:"Database error",error:error});

            if (result.length === 0) {
                return res.status(203).json({ emessage: 'Invalid username' });
            }

            if (result.length > 0) {

                const token = jwt.sign(
                    { username: result[0].username, role: result[0].role },
                    JWT_KEY,
                    { expiresIn: '12h' });

                return res.status(201).json({success:true,Token:token,role:role})

            }else{
                return res.json({success:false})
            }

        })



    }catch(error){
        console.log("Autologin Error :",error)
        return res.status(500).json({message:"Autologin server error"})
    }

})
//---------------------------------------------------------------------------------------------

module.exports = router;
