const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});
//---------------------------------------------------------------------------------------------
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, .png files are allowed!"));
  }
};
//---------------------------------------------------------------------------------------------
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }
});
//---------------------------------------------------------------------------------------------


router.post("/addstaff", upload.single("photo"), async (req, res) => {
  const db = req.db;
  const staffData = req.body;

  
  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  
  const requiredFields = [
    "prefix", "first_name", "last_name", "gender", "date_of_birth",
    "phone_number", "email", "personal_email", "address", "city", "state", "pincode",
    "emergency_contact_name", "emergency_contact_number", "designation", "department",
    "role_type", "employment_type", "reporting_manager", "staff_status",
    "aadhar_number", "pan_number", "bank_account_number", "bank_name",
    "ifsc_code", "salary", "highest_qualification", "specialization", "joining_date", "role"
  ];

  
  const missingFields = requiredFields.filter(field => !staffData[field] || staffData[field].toString().trim() === "");
  if (missingFields.length > 0) {
    return res.status(203).json({
      success: false,
      emessage: "All fields are required",
      missingFields: missingFields
    });
  }

  try {
    
    await db.promise().beginTransaction();

   
    const getYear = new Date().getFullYear();
    const prefix = `NI${getYear}`;

    const [results] = await db.promise().query(
      `SELECT username FROM staff WHERE username LIKE ? ORDER BY username DESC LIMIT 1`,
      [`${prefix}%`]
    );

    let nextNumber = 1;
    if (results.length > 0) {
      const lastNum = parseInt(results[0].username.slice(-4), 10);
      if (!isNaN(lastNum)) {
        nextNumber = lastNum + 1;
      }
    }

    const username = `${prefix}${String(nextNumber).padStart(4, "0")}`;

    
    const hashedPassword = await bcrypt.hash(staffData.date_of_birth, 10);

    
    const photoUrl = req.file
      ? `/uploads/${req.file.filename}`
      : `/uploads/default-user.png`;

   
    const insertStaffQuery = `
      INSERT INTO staff (
        username, prefix, first_name, last_name, gender, date_of_birth,
        photo_url, phone_number, email, personal_email, address, city, state, pincode,
        emergency_contact_name, emergency_contact_number, designation, department,
        role_type, employment_type, reporting_manager, staff_status, aadhar_number,
        pan_number, bank_account_number, bank_name, ifsc_code, salary,
        highest_qualification, specialization, role, joining_date
      ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

   
    await db.promise().query(insertStaffQuery, [
      username, staffData.prefix, staffData.first_name, staffData.last_name,
      staffData.gender, staffData.date_of_birth, photoUrl, staffData.phone_number,
      staffData.email, staffData.personal_email, staffData.address, staffData.city,
      staffData.state, staffData.pincode, staffData.emergency_contact_name,
      staffData.emergency_contact_number, staffData.designation, staffData.department,
      staffData.role_type, staffData.employment_type, staffData.reporting_manager,
      staffData.staff_status, staffData.aadhar_number, staffData.pan_number,
      staffData.bank_account_number, staffData.bank_name, staffData.ifsc_code,
      staffData.salary, staffData.highest_qualification, staffData.specialization,
      staffData.role, staffData.joining_date
    ]);

    
    await db.promise().query(
      `INSERT INTO users (username, password, role) VALUES (?,?,?)`,
      [username, hashedPassword, staffData.role]
    );

   
    await db.promise().commit();

    
    res.status(201).json({
      success: true,
      message: "Staff added successfully",
      username: username
    });

  } catch (error) {
    console.error("Server error while adding staff:", error);

    
    try {
      await db.promise().rollback();
    } catch (rollbackError) {
      console.error("Error rolling back transaction:", rollbackError);
    }

    
    if (error.code === "ER_DUP_ENTRY") {
      const match = error.sqlMessage.match(/for key '(?:.*\.)?(\w+)'/);
      let fieldName = match ? match[1] : "Field";

      const friendlyNames = {
        aadhar_number: "Aadhar Number",
        email: "Email",
        phone_number: "Phone Number",
        pan_number: "PAN Number",
        username: "Username"
      };
      fieldName = friendlyNames[fieldName] || fieldName.replace(/_/g, " ");

      return res.status(203).json({
        success: false,
        emessage: `${fieldName} already exists. Please use a different one.`
      });
    }

    
    res.status(500).json({
      success: false,
      emessage: "Server error while adding staff",
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});
//---------------------------------------------------------------------------------------------
router.get("/getcardstaff",async(req,res)=>{
    const db=req.db;

    try{
      db.query('SELECT username ,prefix, first_name,last_name,gender,photo_url,designation,department,staff_status FROM staff;',async(error,result)=>{
        if(error) return res.status(500).json({emessage:"Database Error",error:error});

        if(result.length===0){
          return res.status(203).json({emessage:"No Staffs"})
        }

        return res.status(200).json({Staffdata:result});
      })

    }catch(error){
      console.log("Error in Getstaff:",error)
      return res.status(500).json({emessage:"Server Error in getting staff"})
    }
})
//---------------------------------------------------------------------------------------------
router.post("/getstaffusername", async (req, res) => {
  const db = req.db;
  const username = req.body.username;

  try {
    db.query(
      `SELECT username, prefix, first_name, last_name, gender, photo_url, designation, department, staff_status 
       FROM staff 
       WHERE first_name LIKE ? OR last_name LIKE ? OR username LIKE ?`,
      [`%${username}%`, `%${username}%`,`%${username}%`],
      (error, result) => {
        if (error) {
          return res.status(500).json({ emessage: "Database Error", error: error });
        }

        if (result.length === 0) {
          return res.status(203).json({ message: "No Staffs" });
        }

        return res.status(200).json({ Staffdata: result });
      }
    );
  } catch (error) {
    console.log("Error in Getstaff:", error);
    return res.status(500).json({ emessage: "Server Error in getting staff" });
  }
});



//---------------------------------------------------------------------------------------------

router.post("/getstaffdetails",async(req,res)=>{
  const db=req.db;
  const username=req.body.username;

  
  try{
      db.query('SELECT * FROM staff WHERE username= ?;',[username],async(error,result)=>{
        if(error) return res.status(500).json({emessage:"Database Error",error:error});

        if(result.length===0){
          return res.status(203).json({emessage:"Staff Details not found "})
        }

        return res.status(200).json({Staffdata:result});
      })

    }catch(error){
      console.log("Error in Getstaff:",error)
      return res.status(500).json({emessage:"Server Error in getting staff"})
    }

})
//---------------------------------------------------------------------------------------------

router.post("/getfilterstaff",async(req,res)=>{
  const db=req.db;
  const department=req.body.department;

  if(!department){
    return res.status(500).json({emessage:"Department name is not given "})
  }

  try {
    db.query(
      `SELECT username, prefix, first_name, last_name, gender, photo_url, designation, department, staff_status 
       FROM staff 
       WHERE department LIKE ?`,
      [`%${department}%`],
      (error, result) => {
        if (error) {
          return res.status(500).json({ emessage: "Database Error", error: error });
        }

        if (result.length === 0) {
          return res.status(203).json({ emessage: "No Staffs" });
        }

        return res.status(200).json({ Staffdata: result });
      }
    );
  } catch (error) {
    console.log("Error in Getstaff:", error);
    return res.status(500).json({ emessage: "Server Error in getting staff" });
  }

})

//---------------------------------------------------------------------------------------------


router.post("/updatestaff", upload.single("photo"), async (req, res) => {
  const db = req.db;
  const staffData = req.body;
  const uusername=req.tokendata.username;

  if (req.fileValidationError) {
    return res.status(400).json({ error: req.fileValidationError });
  }

  if (!staffData.username) {
    return res.status(203).json({
      success: false,
      emessage: "Username is required for update",
    });
  }

  const requiredFields = [
    "prefix", "first_name", "last_name", "gender", "date_of_birth",
    "phone_number", "email", "personal_email", "address", "city", "state", "pincode",
    "emergency_contact_name", "emergency_contact_number", "designation", "department",
    "role_type", "employment_type", "reporting_manager", "staff_status",
    "aadhar_number", "pan_number", "bank_account_number", "bank_name",
    "ifsc_code", "salary", "highest_qualification", "specialization", "role","joining_date"
  ]; 

  const missingFields = requiredFields.filter(field => !staffData[field] || staffData[field].toString().trim() === "");
  if (missingFields.length > 0) {
    return res.status(203).json({
      success: false,
      emessage: "All fields are required",
    });
  }

  try {
    const checkStaffQuery = `SELECT username, photo_url FROM staff WHERE username = ?`;

    db.query(checkStaffQuery, [staffData.username], async (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
      }

      if (results.length === 0) {
        return res.status(203).json({
          success: false,
          emessage: "Staff member not found",
        });
      }

      const currentStaff = results[0];
      var oldPhoto=null;
      
      let photoUrl = currentStaff.photo_url;
      if (req.file) {
        oldPhoto=photoUrl;
        photoUrl = `/uploads/${req.file.filename}`;
      }

      
      const updateQuery = `
        UPDATE staff SET 
          prefix = ?, first_name = ?, last_name = ?, gender = ?, date_of_birth = ?,
          photo_url = ?, phone_number = ?, email = ?, personal_email = ?, address = ?, 
          city = ?, state = ?, pincode = ?, emergency_contact_name = ?, emergency_contact_number = ?,
          designation = ?, department = ?, role_type = ?, employment_type = ?, reporting_manager = ?,
          staff_status = ?, aadhar_number = ?, pan_number = ?, bank_account_number = ?, bank_name = ?,
          ifsc_code = ?, salary = ?, highest_qualification = ?, specialization = ?, role = ?,joining_date= ?,updated_by= ?
        WHERE username = ?
      `;

      db.query(updateQuery, [
        staffData.prefix, staffData.first_name, staffData.last_name,
        staffData.gender, staffData.date_of_birth, photoUrl, staffData.phone_number,
        staffData.email, staffData.personal_email, staffData.address, staffData.city,
        staffData.state, staffData.pincode, staffData.emergency_contact_name,
        staffData.emergency_contact_number, staffData.designation, staffData.department,
        staffData.role_type, staffData.employment_type, staffData.reporting_manager,
        staffData.staff_status, staffData.aadhar_number, staffData.pan_number,
        staffData.bank_account_number, staffData.bank_name, staffData.ifsc_code,
        staffData.salary, staffData.highest_qualification, staffData.specialization,
        staffData.role, staffData.joining_date,uusername,staffData.username
      ], async (err, result) => {
        if (err) {
          

          if (err.code === "ER_DUP_ENTRY") {
            const match = err.sqlMessage.match(/for key '(?:.*\.)?(\w+)'/);
            let fieldName = match ? match[1] : "Field";

            const friendlyNames = {
              aadhar_number: "Aadhar Number",
              email: "Email",
              phone_number: "Phone Number",
              pan_number: "PAN Number"
            };
            fieldName = friendlyNames[fieldName] || fieldName.replace(/_/g, " ");

            return res.status(203).json({
              success: false,
              emessage: `${fieldName} already exists. Please use a different one.`
            });
          }

          return res.status(500).json({
            emessage: "Database update error",
            error: err.message
          });
        }

        if(oldPhoto && oldPhoto !== photoUrl){
          fs.unlink(path.join(__dirname, "../../", oldPhoto), (err) => {
              if (err) console.warn("Failed to delete old photo:", err);
            });

        }

        
        db.query("SELECT username FROM users WHERE username = ?", [staffData.username], async (err, userResults) => {
          if (err) {
            return res.status(500).json({ error: "Database error", details: err.message });
          }

          if (userResults.length === 0) {
            
            
            const hashedPassword = await bcrypt.hash(staffData.date_of_birth, 10);
            console.log(staffData.date_of_birth)
            
            db.query("INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
              [staffData.username,hashedPassword , staffData.role],
              (err) => {
                if (err) {
                  console.error("Error inserting into users:", err);
                  return res.status(500).json({
                    emessage: "Error inserting into users",
                    
                  });
                }

                return res.status(200).json({
                  success: true,
                  message: "Staff updated successfully, user account created",
                  username: staffData.username
                });
              });
          } else {


              db.query("UPDATE users SET role= ? where username = ?",[staffData.role,staffData.username],async(err) => {
                if (err) {
                  
                  return res.status(500).json({
                    emessage: "Error updating into users",
                    error: err.message
                  });
                }

                return res.status(200).json({
                  success: true,
                  message: "Staff updated successfully",
                  username: staffData.username
                });

              })

          }
        });
      });
    });

  } catch (error) {
    console.error("Server error while updating staff:", error);
    res.status(500).json({
      emessage: "Server error while updating staff",
      error: error.message
    });
  }
});

//---------------------------------------------------------------------------------------------

module.exports = router;