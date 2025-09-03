import React,{useState,useEffect} from 'react'
import "./css/Adminclasses.css"
import "./css/admincoursemanage.css"
import axios from "axios"

function AdminManagement({setActiveTab,setEmessage,setMessage}) {

    const [Departments,setDepartments]=useState([]);
      const [courses,setcourses]=useState([]);
      const [Timetables,setTimetables]=useState([]);
      const [Events,setEvents]=useState([]);

      const [Deploading,setDeploading]=useState(true);
      const [CourseLoading,setCourseloading]=useState(true);
      const [TableLoading,setTableLoading]=useState(false);
        
//-------------------------------------------------------------------------------

  const fetchdep=async()=>{
    const Token=localStorage.getItem("Token");
      try{
          const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getdep`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if(response.data.emessage){
        setEmessage(response.data.emessage)
      }
      if(response.data.success){
        setDepartments(response.data.departments)
      }

      }catch(err){
        console.log("Error in fetching dep:",err)
      }finally{setDeploading(false)}

    }     
//-------------------------------------------------------------------------------

  const fetchcourses = async () => {
    const Token = localStorage.getItem("Token");
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
    }finally{setCourseloading(false)}
  };
//-------------------------------------------------------------------------------

  const fetchtimetable = async () => {
    const Token = localStorage.getItem("Token");
    try {
      setTableLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/gettimetable`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.emessage) {
        setEmessage(response.data.emessage);
        setTimetables([]);
      }
      if (response.data.success) {
        setTimetables(response.data.timetable);
      }
    } catch (err) {
      console.log("Error in fetching dep:", err);
    }finally{
      setTableLoading(false)
    }
  };
//-------------------------------------------------------------------------------


  useEffect(() => {
    fetchdep();
    fetchcourses();
    fetchtimetable();
  }, []);

  //-------------------------------------------------------------------------------
  


  return (
    <>
    <div className="adminmanagement-main">
      <h2>Manage College Administration</h2>
      <div className="adminmanagement-cards">
          <div className="adminmanagent-card">
            <h3>Departments</h3>
            <table className="card-table">
              <thead>
                <tr>
                <th>Department Id</th>
                <th>Department</th>
                <th>HOD</th>
                <th>HOD ID</th>
                </tr>
              </thead>
              <tbody>
                {Departments.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                       {Deploading ? "Loading Departments..." : "No Department found!"}
                    </td>
                  </tr>
                ) : (
                Departments.map((dep) => (
                  <tr key={dep.dep_id}>
                      <td>{dep.dep_id}</td>
                      <td>{dep.dep_name}</td>
                      <td>{dep.dep_hod}</td>
                      <td>{dep.dep_hodid}</td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
            <button onClick={()=>{setActiveTab('managedepartment')}}>Manage Departments</button>
          </div>
          <div className="adminmanagent-card">
            <h3>Courses</h3>
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
                    
                  </tr>
                </thead>
                <tbody>
                  {courses.length === 0 ? (
                    <tr>
                      <td colSpan="9" style={{ textAlign: "center" }}>
                        {CourseLoading ? "Loading courses..." : "No courses found!"}
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
                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            <button onClick={()=>{setActiveTab('managecourses')}}>Manage courses</button>
          </div>
          {Timetables.length > 0 ? (
  <div className="adminmanagent-tablecard">
    <div className="timetable-head">
      <p><b>DEPT:</b> {Timetables[0].dep || ""}</p>
      <p><b>HALL NO:</b> {Timetables[0].hall_no || ""}</p> 
      <p><b>SEM:</b> {Timetables[0].sem || ""}</p>
      <p><b>DIV:</b> {Timetables[0].division || ""}</p>
      <p><b>W.E.F:</b> {Timetables[0].wef ? Timetables[0].wef.split("T")[0] : ""}</p>
    </div>

    <table className="timetable-table">
      <thead>
        <tr>
          <th>Day / Period</th>
          <th>I</th>
          <th>II</th>
          <th className="break-col">Break 1</th>
          <th>III</th>
          <th>IV</th>
          <th className="break-col">Lunch</th>
          <th>V</th>
          <th>VI</th>
          <th className="break-col">Break II</th>
          <th>VII</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Monday</td>
          <td><div>{Timetables[0].rd1cd1}</div><div>{Timetables[0].rs1cs1}</div></td>
          <td><div>{Timetables[0].rd1cd2}</div><div>{Timetables[0].rs1cs2}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd1cd3}</div><div>{Timetables[0].rs1cs3}</div></td>
          <td><div>{Timetables[0].rd1cd4}</div><div>{Timetables[0].rs1cs4}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd1cd5}</div><div>{Timetables[0].rs1cs5}</div></td>
          <td><div>{Timetables[0].rd1cd6}</div><div>{Timetables[0].rs1cs6}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd1cd7}</div><div>{Timetables[0].rs1cs7}</div></td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td><div>{Timetables[0].rd2cd1}</div><div>{Timetables[0].rs2cs1}</div></td>
          <td><div>{Timetables[0].rd2cd2}</div><div>{Timetables[0].rs2cs2}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd2cd3}</div><div>{Timetables[0].rs2cs3}</div></td>
          <td><div>{Timetables[0].rd2cd4}</div><div>{Timetables[0].rs2cs4}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd2cd5}</div><div>{Timetables[0].rs2cs5}</div></td>
          <td><div>{Timetables[0].rd2cd6}</div><div>{Timetables[0].rs2cs6}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd2cd7}</div><div>{Timetables[0].rs2cs7}</div></td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td><div>{Timetables[0].rd3cd1}</div><div>{Timetables[0].rs3cs1}</div></td>
          <td><div>{Timetables[0].rd3cd2}</div><div>{Timetables[0].rs3cs2}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd3cd3}</div><div>{Timetables[0].rs3cs3}</div></td>
          <td><div>{Timetables[0].rd3cd4}</div><div>{Timetables[0].rs3cs4}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd3cd5}</div><div>{Timetables[0].rs3cs5}</div></td>
          <td><div>{Timetables[0].rd3cd6}</div><div>{Timetables[0].rs3cs6}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd3cd7}</div><div>{Timetables[0].rs3cs7}</div></td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td><div>{Timetables[0].rd4cd1}</div><div>{Timetables[0].rs4cs1}</div></td>
          <td><div>{Timetables[0].rd4cd2}</div><div>{Timetables[0].rs4cs2}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd4cd3}</div><div>{Timetables[0].rs4cs3}</div></td>
          <td><div>{Timetables[0].rd4cd4}</div><div>{Timetables[0].rs4cs4}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd4cd5}</div><div>{Timetables[0].rs4cs5}</div></td>
          <td><div>{Timetables[0].rd4cd6}</div><div>{Timetables[0].rs4cs6}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd4cd7}</div><div>{Timetables[0].rs4cs7}</div></td>
        </tr>
        <tr>
          <td>Friday</td>
          <td><div>{Timetables[0].rd5cd1}</div><div>{Timetables[0].rs5cs1}</div></td>
          <td><div>{Timetables[0].rd5cd2}</div><div>{Timetables[0].rs5cs2}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd5cd3}</div><div>{Timetables[0].rs5cs3}</div></td>
          <td><div>{Timetables[0].rd5cd4}</div><div>{Timetables[0].rs5cs4}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd5cd5}</div><div>{Timetables[0].rs5cs5}</div></td>
          <td><div>{Timetables[0].rd5cd6}</div><div>{Timetables[0].rs5cs6}</div></td>
          <td className="break-col"></td>
          <td><div>{Timetables[0].rd5cd7}</div><div>{Timetables[0].rs5cs7}</div></td>
        </tr>
      </tbody>
    </table>
    <button onClick={()=>{setActiveTab('managetimetable')}}>Manage Timetables</button>
  </div>
) : (
  <div className="adminmanagent-tablecard">
    <div className="timetable-head">
      <p><b>Timetable:</b> {TableLoading ? "Loading timetable..." : "No timetable available"}</p>
    </div>
  </div>
)}



          <div className="adminmanagent-card">
            <h3>Events</h3>
            <table className="card-table">
              <thead>
                <tr>
                <th>EVENT NAME</th>
                <th>DATE</th>
                <th>BY</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Freshers Day </td>
                  <td>2025-08-21</td>
                  <td>Students</td>
                </tr>
                <tr>
                  <td>Onam Celebration</td>
                  <td>2025-08-28</td>
                  <td>Students</td>
                </tr>
              </tbody>
            </table>
            <button onClick={()=>{setActiveTab('manageevents')}}>Manage events</button>
          </div>

      </div>

    </div>

    </>
  )
}

export default AdminManagement
