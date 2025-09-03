const express = require("express");
const router = express.Router();

router.post("/adddep", async (req, res,next) => {
  const db = req.db;

  var { depid, depname, dephod ,dephodid} = req.body;

  if (!depid || !depname || !dephod||!dephodid) {
    return res.status(203).json({ emessage: "All fields are required" });
  }
  depid =depid.trim();
  depname=depname.trim();
  dephod=dephod.trim();

  try {
    
    const [existingDeps] = await db.promise().query(
            "SELECT * FROM department WHERE dep_id LIKE ? OR dep_name LIKE ?",
            [`%${depid}%`, `%${depname}%`,`%${dephodid}%`]
        );


    if (existingDeps.length > 0) {
      return res.status(203).json({ emessage: "Department ID or Staff Id or Name already exists" });
    }

    
    await db.promise().query(
      "INSERT INTO department (dep_id, dep_name, dep_hod,dep_hodid ) VALUES (?, ?, ?,?)",
      [depid, depname, dephod,dephodid]
    );

    return res.status(201).json({ message: "Department added successfully" ,success:true});
  } catch (error) {
    console.error("Add dep error:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error"});
  }
});
//-------------------------------------------------------------------------------

router.get("/getdep", async (req, res,next) => {
  const db = req.db; 

  try {
    const [departments] = await db.promise().query(`SELECT * FROM department `);
    if(departments.length<1){
        return res.status(203).json({emessage:"No departmrnts find"})
    }
    return res.status(200).json({ departments, success: true });
  } catch (err) {
    console.error("Error in Getdep:", err);
    next(err)
    return res.status(500).json({ emessage: "Server error", error: err.message });
  }
});

router.get("/staffnamesug", async (req, res, next) => {
  const db = req.db;
  const typedName = req.query.typedName || '';

  try {
    const [staffnames] = await db.promise().query(
      `SELECT username, prefix, first_name, last_name ,staff_code
       FROM staff 
       WHERE first_name LIKE ? OR last_name LIKE ? OR username LIKE ?`,
      [`%${typedName}%`, `%${typedName}%`, `%${typedName}%`]
    );

    const suggestions = staffnames.map(({ username, prefix, first_name, last_name ,staff_code}) => ({
      username,
      staffname: `${prefix} ${first_name} ${last_name}`.trim(),
      staff_code: staff_code
    }));

    return res.json({ suggestions });

  } catch (err) {
    console.error("Error in staffnamesug:", err);
    return res.status(500).json({ emessage: "Server error", error: err.message });
  }
});


//-------------------------------------------------------------------------------
router.put("/editdep", async (req, res, next) => {
  const db = req.db;
  
  const { depid,depname, dephod, dephodid,predepid } = req.body;

  if (!depname || !dephod || !dephodid||!depid||!predepid) {
    return res.status(203).json({ emessage: "All fields are required" });
  }

  try {
    
    const [existing] = await db.promise().query(
      "SELECT * FROM department WHERE dep_id = ?",
      [predepid]
    );
    if (existing.length === 0) {
      return res.status(203).json({ emessage: "Department not found" });
    }

    
    await db.promise().query(
      "UPDATE department SET dep_name = ?, dep_hod = ?, dep_hodid = ? WHERE dep_id = ?",
      [depname.trim(), dephod.trim(), dephodid.trim(), predepid]
    );

    return res.status(200).json({ message: "Department updated successfully", success: true });
  } catch (error) {
    console.error("Edit dep error:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error" });
  }
});

//-------------------------------------------------------------------------------
//Course route

router.get("/getcourses", async (req, res, next) => {
  const db = req.db;

  try {
    
    const [firstCourse] = await db
      .promise()
      .query(
        `SELECT * FROM courses WHERE sem = ? ORDER BY course_id ASC LIMIT 1`,
        [1]
      );

    if (firstCourse.length === 0) {
      return res.status(203).json({ 
        success: true,
        courses: Courses || [],
    });
    }

    const department = firstCourse[0].dep_name;

    
    const [Courses] = await db
      .promise()
      .query(
        `SELECT * FROM courses WHERE sem = ? AND dep_name = ?`,
        [1, department]
      );

    return res.status(200).json({
      success: true,
      courses: Courses || [],
    });

  } catch (error) {
    console.log("Error in Getcourses", error);
    next(error);
    return res.status(500).json({ emessage: "Server Error" });
  }
});


//-------------------------------------------------------------------------------

router.post("/addcourse", async (req, res, next) => {
  
  const db = req.db;
  const {
    courseCode,
    CourseName,
    CourseType,
    Credit,
    Depid,
    Department,
    StaffId,
    Staffname,
    Sem,
    Regulation,
  } = req.body;

  

  
  if (
    !courseCode?.trim() ||
    !CourseName?.trim() ||
    !CourseType?.trim() ||
    !Credit ||
    !Depid ||
    !Department?.trim() ||
    !StaffId?.trim() ||
    !Staffname?.trim() ||
    !Sem ||
    !Regulation
  ) {
    return res
      .status(400) 
      .json({ emessage: "All fields are required" });
  }

  try {
    const [result] = await db.promise().query(
      `INSERT INTO courses 
        (course_code, course_name, course_type, credit, dep_id, dep_name, staff_id, staff_name, sem, regulation) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        courseCode.trim(),
        CourseName.trim(),
        CourseType.trim(),
        Number(Credit),   
        Number(Depid),   
        Department.trim(),
        StaffId.trim(),
        Staffname.trim(),
        Number(Sem),
        Number(Regulation),
      ]
    );

    return res.status(201).json({
      success: true,
      message: "Course added successfully!",
      courseId: result.insertId,
    });
  } catch (error) {
    console.error("Error in /addcourse:", error.message);
    return res.status(500).json({ emessage: "Server Error" });
  }
});

//-------------------------------------------------------------------------------

router.get("/courses/filter", async (req, res, next) => {
  const db = req.db;
  const { department, sem } = req.query;

  try {
    let query = "SELECT * FROM courses WHERE 1=1";
    let params = [];

    if (department) {
      query += " AND dep_name LIKE ?";
      params.push(`%${department}%`);
    }

    if (sem) {
      query += " AND sem = ?";
      params.push(Number(sem));
    }

    const [courses] = await db.promise().query(query, params);
   

    if (courses.length < 1) {
      return res.status(203).json({ emessage: "No courses found" });
    }

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error in /courses/filter:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error" });
  }
});
//-------------------------------------------------------------------------------

router.get("/courses/search", async (req, res, next) => {
  const db = req.db;
  const { keyword } = req.query;

  if (!keyword || keyword.trim() === "") {
    return res.status(400).json({ emessage: "Keyword is required" });
  }

  try {
    const [courses] = await db.promise().query(
      `SELECT * FROM courses 
       WHERE course_name LIKE ? OR course_code LIKE ?`,
      [`%${keyword}%`, `%${keyword}%`]
    );

    if (courses.length < 1) {
      return res.status(203).json({ emessage: "No matching courses found" });
    }

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.error("Error in /courses/search:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error" });
  }
});
//-------------------------------------------------------------------------------

router.put("/updatecourse/:id", async (req, res, next) => {
  const db = req.db;
  const { id } = req.params;

  const {
    courseCode,
    CourseName,
    CourseType,
    Credit,
    Depid,
    Department,
    StaffId,
    Staffname,
    Sem,
    Regulation,
  } = req.body;

  if (
    !courseCode ||
    !CourseName ||
    !CourseType ||
    !Credit ||
    !Depid ||
    !Department ||
    !StaffId ||
    !Staffname ||
    !Sem ||
    !Regulation
  ) {
    return res.status(400).json({ emessage: "All fields are required" });
  }

  try {
    
    await db.promise().beginTransaction();

    
    const [staffDetails] = await db.promise().query(
      `SELECT staff_code FROM staff WHERE username = ?`,
      [StaffId]
    );
    
    const staffCode = staffDetails[0]?.staff_code;
    if (!staffCode) {
      await db.promise().rollback();
      return res.status(302).json({ emessage: "Staff Code not available" });
    }

    
    const [result] = await db.promise().query(
      `UPDATE courses
       SET course_code = ?, course_name = ?, course_type = ?, credit = ?, dep_id = ?, dep_name = ?, 
           staff_id = ?, staff_name = ?, sem = ?, regulation = ?
       WHERE course_id = ?`,
      [
        courseCode,
        CourseName,
        CourseType,
        Credit,
        Depid,
        Department,
        StaffId,
        Staffname,
        Sem,
        Regulation,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      await db.promise().rollback();
      return res.status(404).json({ emessage: "Course not found" });
    }

    
    const query = `
      UPDATE timetable
      SET
        rs1cs1 = CASE WHEN rd1cd1 = ? THEN ? ELSE rs1cs1 END,
        rs1cs2 = CASE WHEN rd1cd2 = ? THEN ? ELSE rs1cs2 END,
        rs1cs3 = CASE WHEN rd1cd3 = ? THEN ? ELSE rs1cs3 END,
        rs1cs4 = CASE WHEN rd1cd4 = ? THEN ? ELSE rs1cs4 END,
        rs1cs5 = CASE WHEN rd1cd5 = ? THEN ? ELSE rs1cs5 END,
        rs1cs6 = CASE WHEN rd1cd6 = ? THEN ? ELSE rs1cs6 END,
        rs1cs7 = CASE WHEN rd1cd7 = ? THEN ? ELSE rs1cs7 END,

        rs2cs1 = CASE WHEN rd2cd1 = ? THEN ? ELSE rs2cs1 END,
        rs2cs2 = CASE WHEN rd2cd2 = ? THEN ? ELSE rs2cs2 END,
        rs2cs3 = CASE WHEN rd2cd3 = ? THEN ? ELSE rs2cs3 END,
        rs2cs4 = CASE WHEN rd2cd4 = ? THEN ? ELSE rs2cs4 END,
        rs2cs5 = CASE WHEN rd2cd5 = ? THEN ? ELSE rs2cs5 END,
        rs2cs6 = CASE WHEN rd2cd6 = ? THEN ? ELSE rs2cs6 END,
        rs2cs7 = CASE WHEN rd2cd7 = ? THEN ? ELSE rs2cs7 END,

        rs3cs1 = CASE WHEN rd3cd1 = ? THEN ? ELSE rs3cs1 END,
        rs3cs2 = CASE WHEN rd3cd2 = ? THEN ? ELSE rs3cs2 END,
        rs3cs3 = CASE WHEN rd3cd3 = ? THEN ? ELSE rs3cs3 END,
        rs3cs4 = CASE WHEN rd3cd4 = ? THEN ? ELSE rs3cs4 END,
        rs3cs5 = CASE WHEN rd3cd5 = ? THEN ? ELSE rs3cs5 END,
        rs3cs6 = CASE WHEN rd3cd6 = ? THEN ? ELSE rs3cs6 END,
        rs3cs7 = CASE WHEN rd3cd7 = ? THEN ? ELSE rs3cs7 END,

        rs4cs1 = CASE WHEN rd4cd1 = ? THEN ? ELSE rs4cs1 END,
        rs4cs2 = CASE WHEN rd4cd2 = ? THEN ? ELSE rs4cs2 END,
        rs4cs3 = CASE WHEN rd4cd3 = ? THEN ? ELSE rs4cs3 END,
        rs4cs4 = CASE WHEN rd4cd4 = ? THEN ? ELSE rs4cs4 END,
        rs4cs5 = CASE WHEN rd4cd5 = ? THEN ? ELSE rs4cs5 END,
        rs4cs6 = CASE WHEN rd4cd6 = ? THEN ? ELSE rs4cs6 END,
        rs4cs7 = CASE WHEN rd4cd7 = ? THEN ? ELSE rs4cs7 END,

        rs5cs1 = CASE WHEN rd5cd1 = ? THEN ? ELSE rs5cs1 END,
        rs5cs2 = CASE WHEN rd5cd2 = ? THEN ? ELSE rs5cs2 END,
        rs5cs3 = CASE WHEN rd5cd3 = ? THEN ? ELSE rs5cs3 END,
        rs5cs4 = CASE WHEN rd5cd4 = ? THEN ? ELSE rs5cs4 END,
        rs5cs5 = CASE WHEN rd5cd5 = ? THEN ? ELSE rs5cs5 END,
        rs5cs6 = CASE WHEN rd5cd6 = ? THEN ? ELSE rs5cs6 END,
        rs5cs7 = CASE WHEN rd5cd7 = ? THEN ? ELSE rs5cs7 END
      WHERE dep = ? 
        AND sem = ?;
    `;

    const params = [];
    for (let i = 0; i < 35; i++) {
      params.push(courseCode, staffCode);
    }
    params.push(Department, Sem);

    await db.promise().query(query, params);

    
    await db.promise().commit();

    return res.status(200).json({ 
      success: true, 
      message: "Course and timetable updated successfully" 
    });

  } catch (error) {
    
    try {
      await db.promise().rollback();
    } catch (rollbackError) {
      console.error("Error during rollback:", rollbackError);
    }
    
    console.error("Error in /updatecourse:", error);
    return res.status(500).json({ emessage: "Server error" });
  }
});


//-------------------------------------------------------------------------------

router.get("/coursecodesug", async (req, res) => {
  const db = req.db;
  const typedName = req.query.typedName || '';

  try {
    const [courses] = await db.promise().query(
      `SELECT 
          c.course_id, 
          c.course_code, 
          c.course_name, 
          c.staff_id, 
          s.staff_code
       FROM courses c
       JOIN staff s ON c.staff_id = s.username
       WHERE c.course_code LIKE ? OR c.course_name LIKE ?`,
      [`%${typedName}%`, `%${typedName}%`]
    );

    return res.json({ courseCode: courses });

  } catch (err) {
    console.error("Error in coursecodesug:", err);
    return res.status(500).json({ emessage: "Server error", error: err.message });
  }
});
//-------------------------------------------------------------------------------

router.post("/addtimetable", async (req, res) => {
  try {
    const {timetable} = req.body;
    const db = req.db;

    
    for (const [key, value] of Object.entries(timetable)) {
      if (value === null || value === undefined || value === "") {
        return res.status(203).json({
          emessage: `Missing or empty value for field: ${key}`,
        });
      }
    }

    const keys = Object.keys(timetable);
    const values = Object.values(timetable);

    const placeholders = keys.map(() => "?").join(",");
    const query = `INSERT INTO timetable (${keys.join(",")}) VALUES (${placeholders})`;

    const [result] = await db.promise().query(query, values);

    res.status(201).json({
      success: true,
      message: "Timetable added successfully",
      
    });
  } catch (err) {
    console.error("Error inserting timetable:", err);
    res.status(500).json({ success: false, message: "Failed to save timetable" });
  }
});
//-------------------------------------------------------------------------------

router.get("/gettimetable", async (req, res, next) => {
  const db = req.db;

  try {
    
    const [firstTimetable] = await db
      .promise()
      .query(
        `SELECT * FROM timetable ORDER BY id ASC LIMIT 1`
      );

    if (firstTimetable.length === 0) {
      return res.status(203).json({
        success: true,
        timetable: [],
      });
    }

    const { sem, dep} = firstTimetable[0];

    
    const [Timetable] = await db
      .promise()
      .query(
        `SELECT * FROM timetable WHERE sem = ? AND dep = ? AND division = 1 ORDER BY id ASC`,
        [sem, dep]
      );

    return res.status(200).json({
      success: true,
      timetable: Timetable || [],
    });

  } catch (error) {
    console.log("Error in GetTimetable:", error);
    next(error);
    return res.status(500).json({ emessage: "Server Error" });
  }
});

//-------------------------------------------------------------------------------
router.put("/updatetimetable", async (req, res,next) => {
  try {
    const { timetable, id } = req.body;
    const db = req.db;

    if (!id) {
      return res.status(400).json({
        success: false,
        emessage: "Missing timetable ID for update",
      });
    }

    
    for (const [key, value] of Object.entries(timetable)) {
      if (value === null || value === undefined || value === "") {
        return res.status(203).json({
          success: false,
          emessage: `Missing or empty value for field: ${key}`,
        });
      }
    }

    const keys = Object.keys(timetable);
    const values = Object.values(timetable);

    const setClause = keys.map((key) => `${key} = ?`).join(", ");
    const query = `UPDATE timetable SET ${setClause} WHERE id = ?`;

    values.push(id);

    await db.promise().execute(query, values);

    return res.status(200).json({
      success: true,
      message: "Timetable updated successfully",
    });
  } catch (err) {
    console.error("Error updating timetable:", err);
    next(err);
    return res.status(500).json({
      success: false,
      emessage: "Failed to update timetable",
    });
  }
});

//-------------------------------------------------------------------------------

router.get("/timetable/filter", async (req, res, next) => {
  const db = req.db;
  const { dep, hall_no, sem, division } = req.query;

  try {
    let query = "SELECT * FROM timetable WHERE 1=1";
    let params = [];

    if (dep) {
      query += " AND dep LIKE ?";
      params.push(`%${dep}%`);
    }

    if (hall_no) {
      query += " AND hall_no LIKE ?";
      params.push(`%${hall_no}%`);
    }

    if (sem) {
      query += " AND sem = ?";
      params.push(Number(sem));
    }

    if (division) {
      query += " AND division LIKE ?";
      params.push(`%${division}%`);
    }

    const [timetables] = await db.promise().query(query, params);

    if (timetables.length < 1) {
      return res.status(203).json({ emessage: "No timetables found" });
    }

    return res.status(200).json({ success: true, timetables });
  } catch (error) {
    console.error("Error in /timetable/filter:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error" });
  }
});
//-------------------------------------------------------------------------------

module.exports = router;
