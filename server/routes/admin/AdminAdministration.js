const express = require("express");
const router = express.Router();

router.post("/adddep", async (req, res) => {
  const db = req.db;
  console.log(req.body);
  var { depid, depname, dephod } = req.body;

  if (!depid || !depname || !dephod) {
    return res.status(203).json({ emessage: "All fields are required" });
  }
  depid =depid.trim();
  depname=depname.trim();
  dephod=dephod.trim();

  try {
    
    const [existingDeps] = await db.promise().query(
            "SELECT * FROM department WHERE dep_id LIKE ? OR dep_name LIKE ?",
            [`%${depid}%`, `%${depname}%`]
        );


    if (existingDeps.length > 0) {
      return res.status(203).json({ emessage: "Department ID or Name already exists" });
    }

    
    await db.promise().query(
      "INSERT INTO department (dep_id, dep_name, dep_hod) VALUES (?, ?, ?)",
      [depid, depname, dephod]
    );

    return res.status(201).json({ message: "Department added successfully" ,success:true});
  } catch (error) {
    console.error("Add dep error:", error);
    return res.status(500).json({ emessage: "Server error", error: error.message });
  }
});

router.get("/getdep", async (req, res) => {
  const db = req.db; 

  try {
    const [departments] = await db.promise().query("SELECT * FROM department");

    return res.status(200).json({ departments, success: true });
  } catch (err) {
    console.error("Error in Getdep:", err);
    return res.status(500).json({ emessage: "Server error", error: err.message });
  }
});

module.exports = router;
