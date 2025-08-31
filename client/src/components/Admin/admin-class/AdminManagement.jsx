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


  useEffect(() => {
    fetchcourses();
  }, []);

  
  useEffect(()=>{
    fetchdep();
    
  },[])





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
  <div className="adminmanagent-tablecard">
  <h3>Timetables</h3>
  <div className="timetable-head">
    <p><b>DEPT:</b> ARTIFICIAL INTELIGENCE AND DATA SCIENCE</p>
    <p><b>HALL NO:</b> C201</p> 
    <p><b>YEAR/SEM:</b> III/05</p>
    <p><b>W.E.F:</b> 2025-08-18</p>

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
        <td><div>AD3501</div><div>ABJ</div></td>
        <td><div>CS3551</div><div>RPA</div></td>
        <td className="break-col"></td>
        <td><div>CCS366</div><div>ABJ</div></td>
        <td><div>NM</div><div>KRM</div></td>
        <td className="break-col"></td>
        <td><div>NM</div><div>KRM</div></td>
        <td><div>NM</div><div>KRM</div></td>
        <td className="break-col"></td>
        <td><div>NM</div><div>KRM</div></td>
      </tr>
      <tr>
        <td>Tuesday</td>
        <td><div>CW3551</div><div>TST</div></td>
        <td><div>CS3551</div><div>RPA</div></td>
        <td className="break-col"></td>
        <td><div>CCS334</div><div>RPA</div></td>
        <td><div>CCS334</div><div>RPA</div></td>
        <td className="break-col"></td>
        <td><div>AD5311</div><div>ABJ</div></td>
        <td><div>AD5311</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>AD5311</div><div>ABJ</div></td>

      </tr>
      <tr>
        <td>Wednesday</td>
        <td><div>CCS334</div><div>RPA</div></td>
        <td><div>AD3501</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CCS334</div><div>RPA</div></td>
        <td><div>AD3501</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>MX3084</div><div>PPA</div></td>
        <td><div>CCS369</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CCS369</div><div>ABJ</div></td>
      </tr>
      <tr>
        <td>Thursday</td>
        <td><div>CCS369</div><div>ABJ</div></td>
        <td><div>CCS366</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CCS366</div><div>ABJ</div></td>
        <td><div>AD3501</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CCS334</div><div>RPA</div></td>
        <td><div>AD3501</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CW3551</div><div>TST</div></td>
      </tr>
      <tr>
        <td>Friday</td>
        <td><div>CCS366</div><div>ABJ</div></td>
        <td><div>CW3551</div><div>TST</div></td>
        <td className="break-col"></td>
         <td><div>MX3084</div><div>PPA</div></td>
        <td><div>CS3551</div><div>RPA</div></td>
        <td className="break-col"></td>
        <td><div>CCS369</div><div>ABJ</div></td>
        <td><div>CCS369</div><div>ABJ</div></td>
        <td className="break-col"></td>
        <td><div>CCS369</div><div>ABJ</div></td>
      </tr>
    </tbody>
  </table>
  <button onClick={()=>{setActiveTab('managetimetable')}}>Manage Timetable</button>
</div>


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
