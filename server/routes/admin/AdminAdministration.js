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
      `SELECT username, prefix, first_name, last_name 
       FROM staff 
       WHERE first_name LIKE ? OR last_name LIKE ? OR username LIKE ?`,
      [`%${typedName}%`, `%${typedName}%`, `%${typedName}%`]
    );

    const suggestions = staffnames.map(({ username, prefix, first_name, last_name }) => ({
      username,
      staffname: `${prefix} ${first_name} ${last_name}`.trim()
    }));

    return res.json({ suggestions });

  } catch (err) {
    console.error("Error in staffnamesug:", err);
    return res.status(500).json({ emessage: "Server error", error: err.message });
  }
});

//-------------------------------------------------------------------------------

router.post('/addcourse', async (req, res,next) => {
  const db = req.db;
  let {
    course_code,
    course_name,
    course_type,
    credit,
    dep_id,
    sem
  } = req.body;

  
  if (!course_code || !course_name || !course_type || !credit || !dep_id || !sem) {
    return res.status(203).json({ emessage: 'All fields are required' });
  }

  
  course_code = course_code.trim();
  course_name = course_name.trim();
  course_type = course_type.trim();

  try {
    
    const [existingCourses] = await db.promise().query(
      'SELECT * FROM courses WHERE course_code = ? AND dep_id = ? AND sem = ? AND course_name = ?',
      [course_code, dep_id, sem,course_name]
    );

    if (existingCourses.length > 0) {
      return res.status(203).json({ emessage: 'Course already exists for this department and semester' });
    }

    
    await db.promise().query(
      `INSERT INTO courses
       (course_code, course_name, course_type, credit, dep_id, sem)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [course_code, course_name, course_type, credit, dep_id, sem]
    );

    return res.status(201).json({ message: 'Course added successfully', success: true });
  } catch (error) {
    console.error('Add course error:', error);
    next(err);
    return res.status(500).json({ emessage: 'Server error'});
  }
});
//-------------------------------------------------------------------------------

router.delete("/deletedep", async (req, res, next) => {
  const db = req.db;
  const depid = req.body.depid;
  console.log(depid)

  if (!depid) {
    return res.status(203).json({ emessage: "Department ID is required" });
  }

  try {
    
    const [existing] = await db.promise().query(
      "SELECT * FROM department WHERE dep_id = ?",
      [depid]
    );
    if (existing.length === 0) {
      return res.status(203).json({ emessage: "Department not found" });
    }

   
    await db.promise().query(
      "DELETE FROM department WHERE dep_id = ?",
      [depid]
    );
    return res.status(200).json({ message: "Department deleted successfully", success: true });
  } catch (error) {
    console.error("Delete dep error:", error);
    next(error);
    return res.status(500).json({ emessage: "Server error" });
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
//-------------------------------------------------------------------------------

router.post("/addcourse",async(req,res,next)=>{
  const db=req.db;

  let(coursecode,coursename,coursetype,credit,dep_id,staffname,staffid,sem,regulation)=req.body;

  if(!coursecode||!coursename||!coursetype||!credit||!dep_id||!staffname||!sem||!regulation){
    return res.status(203).json({emessage:"All fields are required"})
  }
  coursecode=coursecode.trim();
  coursename=coursename.trim();
  coursetype=coursetype.trim();
  staffname=staffname.trim();
  credit=number(credit.trim());
  sem=number(sem.trim());
  regulation=number(regulation.trim());

try{
  const [departments]=await db.promise().query(
    "SELECT * FROM department WHERE dep_id LIKE ?",
    [`%${dep_id}%`]
  );
  if(departments.length<1){
    return res.status(203).json({emessage:"Department not found"})
  } 

  const [existingCourses]=await db.promise().query(
    "SELECT * FROM courses WHERE course_code = ? AND dep_id = ? AND sem = ? AND regulation = ?",
    [coursecode,dep_id,sem,regulation]
  );
  if(existingCourses.length>0){
    return res.status(203).json({emessage:"Course already exists for this department,semester and regulation"})
  } 
  await db.promise().query(
    `INSERT INTO courses
     (course_code, course_name, course_type, credit, dep_id, staff_name, staff_id, sem, regulation)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [coursecode,coursename,coursetype,credit,dep_id,staffname,staffid,sem,regulation]
  );
  return res.status(201).json({message:"Course added successfully",success:true});

}catch(error){
  console.error("Add course error:",error);
  next(error);
  return res.status(500).json({emessage:"Server error"});
}

})


//-------------------------------------------------------------------------------

router.get("/getcourses",async(req,res,next)=>{
  const db=req.db;
  try{
    const [Courses]=await db.promise().query(`SELECT * FROM courses`)
    return res.status(200).json({success:true,courses:Courses||[]})

  }catch(error){
    console.log("Error in Getcourses",error);
    next(error);
    return res.status(500).json({emessage:"Server Error"})

  }
})
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

  console.log("courseData =>", {
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
  });

  
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
module.exports = router;
