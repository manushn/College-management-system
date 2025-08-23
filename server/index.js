const express= require('express');
const app = express();
const cors= require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const port=4000;
const path=require("path");


const login =require("./routes/Login");
const AdminStaff=require("./routes/admin/AdminStaff");
const Createpassword=require("./routes/Createpassword");
const Administration=require("./routes/admin/AdminAdministration");

const VerifyToken=require("./middleware/tokenVerify");

app.use(cors());
app.use(express.json());
dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/",login);
app.use("/",Createpassword);
app.use('/admin',VerifyToken,AdminStaff);
app.use('/admin',VerifyToken,Administration);

app.listen(port||4000,()=>{
    console.log(`Server is running on port ${port}`)
})