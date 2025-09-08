const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const mysqlPromise = require('mysql2/promise');
const path = require('path');
const logger = require('./logger');
const schemas = require('./Schemas/Schemas');
const Fingerprint = require('express-fingerprint');

const port = 4000;


const login = require("./routes/Login");
const AdminStaff = require("./routes/admin/AdminStaff");
const Createpassword = require("./routes/Createpassword");
const Administration = require("./routes/admin/AdminAdministration");
const VerifyToken = require("./middleware/tokenVerify");

dotenv.config();
app.use(cors());
app.use(express.json());


(async () => {
  try {
    
    const connection = await mysqlPromise.createConnection({
      host: 'localhost',
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DATABASE_NAME}\`;`);
    console.log(`Database "${process.env.DATABASE_NAME}" ensured.`);

    
    const dbPromise = await mysqlPromise.createConnection({
      host: 'localhost',
      user: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    });

    
    for (const [name, schema] of Object.entries(schemas)) {
      await dbPromise.query(schema);
      console.log(`Table "${name}" ensured.`);
    }

    await dbPromise.end();
    console.log("All schema checks complete ");

    
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

  app.use(Fingerprint({
    parameters: [
      Fingerprint.useragent,
      Fingerprint.acceptHeaders,
      Fingerprint.geoip
    ]
  }));
    
    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.use("/", login);
    app.use("/", Createpassword);
    app.use('/admin', VerifyToken, AdminStaff);
    app.use('/admin', VerifyToken, Administration);

    
    app.use((err, req, res, next) => {
      logger.error({
        message: err.message,
        stack: err.stack,
        route: req.originalUrl,
        method: req.method,
        ip: req.ip,
      });
      res.status(500).json({ error: 'Internal Server Error' });
    });

    
    app.listen(port || 4000, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("DB setup error:", err);
    process.exit(1);
  }
})();