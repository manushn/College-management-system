const express=require("express");
const router=express.Router();
const bcrypt = require('bcrypt');

router.post("/addstaff",async(req,res)=>{
    const db=req.db;
    const staffData=req.body;

    try{

        const getYear=new Date().getFullYear();

        const lastUserQuery=`
        SELECT username FROM staff WHERE username LIKE ? ORDER BY username DESC LIMIT 1
        `;

        const prefix = `NI${year}`;

        db.query(lastUserQuery, [`${prefix}%`], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error", details: err });

            let nextNumber = 1;
            if (results.length > 0) {
                
                const lastUsername = results[0].username;
                const lastNum = parseInt(lastUsername.slice(-4)); 
                nextNumber = lastNum + 1;
            }

            
            const username = `${prefix}${String(nextNumber).padStart(4, "0")}`;

            
            let dob = staffData.date_of_birth.replace(/-/g, ""); 
            const hashedPassword = await bcrypt.hash(dob, 10);

            
            const insertQuery = `
                INSERT INTO staff (
                    username, password, prefix, first_name, last_name, gender, date_of_birth,
                    photo_url, phone_number, email, personal_email, address, city, state, pincode,
                    emergency_contact_name, emergency_contact_number, designation, department,
                    role_type, employment_type, reporting_manager, staff_status, aadhar_number,
                    pan_number, bank_account_number, bank_name, ifsc_code, salary,
                    highest_qualification, specialization, role
                ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            `;

            db.query(insertQuery, [
                username, hashedPassword, staffData.prefix, staffData.first_name, staffData.last_name,
                staffData.gender, staffData.date_of_birth, staffData.photo_url, staffData.phone_number,
                staffData.email, staffData.personal_email, staffData.address, staffData.city,
                staffData.state, staffData.pincode, staffData.emergency_contact_name,
                staffData.emergency_contact_number, staffData.designation, staffData.department,
                staffData.role_type, staffData.employment_type, staffData.reporting_manager,
                staffData.staff_status, staffData.aadhar_number, staffData.pan_number,
                staffData.bank_account_number, staffData.bank_name, staffData.ifsc_code,
                staffData.salary, staffData.highest_qualification, staffData.specialization,
                staffData.role
            ], (err, result) => {
                if (err) return res.status(500).json({ emessage: "Insert error", error: err });

                res.status(201).json({
                    success: true,
                });
            });
        });


    }catch(error){
        res.status(500).json({emessage:"Server eror while Adding Staff",error:error})
    }

})

module.exports=router;
