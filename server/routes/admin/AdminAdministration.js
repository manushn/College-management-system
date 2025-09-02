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
      return res.status(404).json({ emessage: "Course not found" });
    }

    return res.status(200).json({ success: true, message: "Course updated successfully" });
  } catch (error) {
    console.error("Error in /updatecourse:", error);
    next(error);
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
    const timetable = req.body;
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

module.exports = router;
