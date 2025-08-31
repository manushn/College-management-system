import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/admincoursemanage.css";
import "./css/admindepmanage.css";

function AdminCourseManage({ setActiveTab, setEmessage, setMessage }) {
  const [Isedit, setIsedit] = useState(false);
  const [IsAdd, setIsAdd] = useState(false);
  const [Isloading, setIsloading] = useState(false);

  const [departments, setdepartments] = useState([]);
  const [namesuggest, setnamesuggest] = useState([]);
  const [courses, setcourses] = useState([]);

  const [courseId,setcourseId]=useState("");
  const [courseCode, setCourseCode] = useState("");
  const [CourseName, setCourseName] = useState("");
  const [CourseType, setCourseType] = useState("Regular");
  const [Credit, setCredit] = useState("");
  const [Depid, setDepId] = useState("");
  const [Department, setDepartment] = useState("");
  const [Staffname, setStaffname] = useState("");
  const [StaffId, setStaffId] = useState("");
  const [Sem, setSem] = useState("");
  const [Regulation, setRegulation] = useState("");

  const [filterDep, setfilterDep] = useState("");
  const [filterSem, setfilterSem] = useState("");
  const [filterchar, setfilterchar] = useState("");

  //--------------------------------------------------------------------------------------

  const handleAdding = async (e) => {
    e.preventDefault();
    if (
      !courseCode ||
      !CourseName ||
      !CourseType ||
      !Credit ||
      !Department ||
      !Depid ||
      !Staffname ||
      !StaffId ||
      !Sem ||
      !Regulation
    ) {
      setEmessage("Enter all Fields!");
      return;
    }
    console.log(courseCode,CourseName,CourseType ,Credit,Department ,Depid,Staffname ,StaffId ,Sem ,Regulation)

    try {
      setIsloading(true);
      const Token = localStorage.getItem("Token");

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/addcourse`,
        {
          courseCode,
          CourseName,
          CourseType,
          Credit,
          Depid,
          Department,
          Staffname,
          StaffId,
          Sem,
          Regulation,
        },
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        setMessage("Course added successfully!");
        clearForm();
        setIsAdd(false);
        fetchcourses(); // refresh courses list
      } else if (response.data.emessage) {
        setEmessage(response.data.emessage);
      }
    } catch (err) {
      console.log("Error in Adding course:", err);
      setEmessage("Error adding course!");
    } finally {
      setIsloading(false);
    }
  };

  //--------------------------------------------------------------------------------------

  const handleDepChange = (e) => {
    const id = e.target.value;
    setDepId(id);

    const dep = departments.find((d) => String(d.dep_id) === String(id));
    setDepartment(dep ? dep.dep_name : "");
  };

  //--------------------------------------------------------------------------------------

  useEffect(() => {
    const getstaffname = async () => {
      if (Staffname.length < 1) {
        setStaffId("");
        setnamesuggest([]);
        return;
      }
      const Token = localStorage.getItem("Token");

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/staffnamesug`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          params: { typedName: Staffname },
        }
      );

      if (response.data.suggestions) {
        setnamesuggest(response.data.suggestions);
      }
    };

    getstaffname();
  }, [Staffname]);

  //--------------------------------------------------------------------------------------

  const fetchdep = async () => {
    const Token = localStorage.getItem("Token");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getdep`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.emessage) {
        setEmessage(response.data.emessage);
        setdepartments([]);
      }
      if (response.data.success) {
        setdepartments(response.data.departments);
      }
    } catch (err) {
      console.log("Error in fetching dep:", err);
    }
  };

  //--------------------------------------------------------------------------------------

  const fetchcourses = async () => {
    const Token = localStorage.getItem("Token");
    setfilterDep("");
    setfilterSem("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getcourses`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.emessage) {
        setEmessage(response.data.emessage);
        setcourses([]);
      }
      if (response.data.success) {
        setcourses(response.data.courses);
      }
    } catch (err) {
      console.log("Error in fetching courses:", err);
    }
  };

  //--------------------------------------------------------------------------------------

  const handleCourseFilter=async()=>{
    if (!filterDep){
      setfilterSem("1");
      return
    }
    try{
      const Token = localStorage.getItem("Token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/courses/filter`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
          params:{
          department:filterDep||"",
          sem:filterSem||"1"
        }
        },
        
      );

      if(response.data.emessage){
        setEmessage(response.data.emessage)
        setcourses([])
      }
      if(response.data.success){
        setcourses(response.data.courses)
      }

    }catch(err){
      console.log("Error in getting filtered courses:",err)
    }

  };

  useEffect(() => {
  // if search is cleared, reload all courses
  if (!filterchar.trim()) {
    fetchcourses();
    return;
  }

  
  const handler = setTimeout(() => {
    const runSearch = async () => {
      try {
        const Token = localStorage.getItem("Token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/admin/courses/search`,
          {
            headers: {
              Authorization: `Bearer ${Token}`,
              "Content-Type": "application/json",
            },
            params: { keyword: filterchar }, 
          }
        );

        if (response.data.success) {
          setcourses(response.data.courses);
        } else if (response.data.emessage) {
          setEmessage(response.data.emessage);
          setcourses([]);
        }
      } catch (err) {
        console.log("Error in searching courses:", err);
        setEmessage("Error fetching search results!");
      }
    };

    runSearch();
  }, 500); 
  return () => clearTimeout(handler); 
}, [filterchar]);

const handleUpdate = async (e) => {
  e.preventDefault();
  if (
    !courseId||
    !courseCode ||
    !CourseName ||
    !CourseType ||
    !Credit ||
    !Department ||
    !Depid ||
    !Staffname ||
    !StaffId ||
    !Sem ||
    !Regulation
  ) {
    setEmessage("Enter all Fields!");
    return;
  }

  try {
    setIsloading(true);
    const Token = localStorage.getItem("Token");

    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/admin/updatecourse/${courseId}`, // courseId must come from selected course
      {
        courseCode,
        CourseName,
        CourseType,
        Credit,
        Depid,
        Department,
        Staffname,
        StaffId,
        Sem,
        Regulation,
      },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setMessage("Course updated successfully!");
      clearForm();
      setIsAdd(false);
      setIsedit(false);
      fetchcourses(); 
    } else if (response.data.emessage) {
      setEmessage(response.data.emessage);
    }
  } catch (err) {
    console.log("Error in updating course:", err);
    setEmessage("Error updating course!");
  } finally {
    setIsloading(false);
  }
};


  useEffect(()=>{
    if(filterDep){

    handleCourseFilter()
    }else{
      setfilterSem("");
      fetchcourses()
    }


  },[filterDep,filterSem])

useEffect(()=>{
  fetchdep()
},[])

  useEffect(() => {
    fetchcourses();
  }, []);

  useEffect(() => {
    if (!IsAdd) {
      fetchcourses();
    } else {
      fetchdep();
    }
  }, [IsAdd]);

  //--------------------------------------------------------------------------------------

  const clearForm = () => {
    setCourseCode("");
    setCourseName("");
    setCourseType("Regular");
    setCredit("");
    setDepId("");
    setDepartment("");
    setStaffId("");
    setStaffname("");
    setSem("");
    setRegulation("");
    setcourseId("");
  };

  const Seteditform=(c)=>{
    setCourseCode(c.course_code);
    setCourseName(c.course_name);
    setCourseType(c.course_type);
    setCredit(c.credit);
    setDepId(c.dep_id);
    setDepartment(c.dep_name);
    setStaffId(c.staff_id);
    setStaffname(c.staff_name);
    setSem(c.sem);
    setRegulation(c.regulation);
    setcourseId(c.course_id)
  }
  //--------------------------------------------------------------------------------------

  return (
    <div className="admin-course-main">
      <div className="admin-course-head">
        <h2>Manage Course</h2>
        <button onClick={() => setActiveTab("")}>Back</button>
      </div>
      <div className="admin-course-body">
        {IsAdd ? (
          <div className="admin-course-add">
            <div className="admin-course-add-form">
              <h2>Add Course</h2>
              <form onSubmit={Isedit ? handleUpdate : handleAdding}>
                <div className="course-sub">
                  <label>Course Code</label>
                  <input
                    type="text"
                    value={courseCode}
                    onChange={(e) =>
                      setCourseCode(e.target.value.trim().toUpperCase())
                    }
                  />
                </div>
                <div className="course-sub">
                  <label>Course Name</label>
                  <input
                    type="text"
                    value={CourseName}
                    onChange={(e) =>
                      setCourseName(e.target.value.toUpperCase())
                    }
                  />
                </div>
                <div className="course-sub">
                  <label>Course Type</label>
                  <select
                    value={CourseType}
                    onChange={(e) => setCourseType(e.target.value)}
                  >
                    <option value="Regular">Regular</option>
                    <option value="Elective">Elective</option>
                  </select>
                </div>

                <div className="course-sub">
                  <label>Credit</label>
                  <input
                    type="number"
                    value={Credit}
                    onChange={(e) => setCredit(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="course-sub">
                  <label>Department</label>
                  <select value={Depid} onChange={handleDepChange}>
                    <option value="">Select Department</option>
                    {departments.map((dep) => (
                      <option key={dep.dep_id} value={dep.dep_id}>
                        {dep.dep_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="course-sub">
                  <label>Staff Name</label>
                  <input
                    type="text"
                    value={Staffname}
                    onChange={(e) => setStaffname(e.target.value)}
                  />
                </div>
                <div className="course-sub">
                  <label>Semester</label>
                  <select value={Sem} onChange={(e) => setSem(e.target.value)}>
                    <option value="">Semester</option>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="course-sub">
                  <label>Regulation</label>
                  <input
                    type="number"
                    value={Regulation}
                    onChange={(e) => setRegulation(e.target.value)}
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div className="admin-adddep-btn">
                  <button type="submit">
                        {Isloading ? (Isedit ? "Updating..." : "Adding...") : Isedit ? "Update" : "Add"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      clearForm();
                      setIsAdd(false);
                      setIsedit(false);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
            {namesuggest.length > 0 && (
              <div className="suggesionpopup">
                {namesuggest.map((user) => (
                  <p
                    key={user.username}
                    onClick={() => {
                      setStaffname(user.staffname);
                      setStaffId(user.username);
                      setnamesuggest([]);
                    }}
                  >
                    {user.staffname}
                  </p>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="admi-dep-table">
            <div className="adminmanagent-card">
              <div className="admin-card-head">
                <h3>Courses</h3>
                <input
                  type="text"
                  value={filterchar}
                  placeholder="Search courses"
                  onChange={(e) => setfilterchar(e.target.value)}
                />
              </div>

              <div className="card-filter">
                <div className="card-filter-header">
                  <p>Filter by:</p>
                  <div className="card-filter-con">
                    <div className="card-filter-con-sub">
                      <select
                        value={filterDep}
                        onChange={(e) => setfilterDep(e.target.value)}
                      >
                        <option value="">Department</option>
                        {departments.map((dep) => (
                          <option key={dep.dep_name} value={dep.dep_name}>
                            {dep.dep_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="card-filter-con-sub">
                      <select
                        value={filterSem}
                        onChange={(e) => setfilterSem(e.target.value)}
                      >
                        <option value="">Semester</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="card-filter-con-sub">
                    <button onClick={()=>{setfilterDep("");setfilterSem("")}}>Clear</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-head-details">
                  <p><b>Department:</b> {courses.length > 0 ? courses[0].dep_name : "No department available"}</p> 
                  <p><b>Semester:</b>{courses.length > 0 ? courses[0].sem : "No Semester available"} </p>                 
              </div>

              <table className="card-table">
                <thead>
                  <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Course Type</th>
                    <th>Credit</th>
                    <th>Lecturer</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>From Regulation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        {Isloading ? "Loading courses..." : "No courses found!"}
                      </td>
                    </tr>
                  ) : (
                    courses.map((cour) => (
                      <tr key={cour.course_id}>
                        <td>{cour.course_code}</td>
                        <td>{cour.course_name}</td>
                        <td>{cour.course_type}</td>
                        <td>{cour.credit}</td>
                        <td>{cour.staff_name}</td>
                        <td>{cour.dep_name}</td>
                        <td>{cour.sem}</td>
                        <td>{cour.regulation}</td>
                        <td>
                          <button
                            className="dep-edit-btn"
                            onClick={() => {
                              setIsedit(true);
                              setIsAdd(true);
                              Seteditform(cour);
                              
                            }}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
              <button onClick={() => setIsAdd(true)}>Add Course</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminCourseManage;