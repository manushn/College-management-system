const express= require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS =require("crypto-js");

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

router.post("/login", async (req, res) => {
  const db = req.db;
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ emessage: "All fields are required!" });
  }

  try {
    const [rows] = await db
      .promise()
      .query("SELECT * FROM users WHERE username = ?", [username]);

    if (rows.length === 0) {
      return res.status(203).json({ emessage: "Invalid username" });
    }

    const userdata = rows[0];

    const match = await bcrypt.compare(password, userdata.password);
    if (!match) {
      return res.status(203).json({ emessage: "Invalid password" });
    }
    
    const token = jwt.sign(
      {
        username: userdata.username,
        role: userdata.role,
        fingerprint: req.fingerprint?.hash || null,
      },
      process.env.JWT_KEY,
      { expiresIn: "12h" }
    );

    
    const encryptedToken = CryptoJS.AES.encrypt(
      token, 
      process.env.CRYPTO_KEY
    ).toString();

    return res.status(200).json({
      success: true,
      token: encryptedToken,
      role: userdata.role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ emessage: "Login server error" });
  }
});
//----------------------------------------------------------------------------------------


module.exports = router;
