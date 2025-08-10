const jwt = require('jsonwebtoken');

const tokenVerify =(req,res,next)=>{
    const authheader =req.headers['authorization'];
    const token=authheader&&authheader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"No token , Access Denied"})
    }

    jwt.verify(token,process.env.JWT_KEY,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid or Token Expaired"})
        }
        req.tokendata=user;
        next();
    });
};
module.exports=tokenVerify;