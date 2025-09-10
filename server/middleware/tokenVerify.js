const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const tokenVerify = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(203).json({ message: "No token, access denied" });
  }

  try {
    
    const bytes = CryptoJS.AES.decrypt(token, process.env.CRYPTO_KEY);
    const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

    
    jwt.verify(decryptedToken, process.env.JWT_KEY, (err, payload) => {
      if (err) {
        return res.status(203).json({ message: "Invalid or token expired" });
      }

      
      //if (payload.fingerprint !== req.fingerprint?.hash||"") {
     //   return res.status(203).json({ message: "Invalid fingerprint or token" });
     // }

      req.tokendata = payload;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(500).json({ message: "Server error during token verification" });
  }
};

module.exports = tokenVerify;