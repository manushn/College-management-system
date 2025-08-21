import React, { useState } from 'react'
import "./css/Adminclasses.css"



function AdminClasses() {

  const [Departments,setDepartments]=useState([]);
  const [Courses,setCourses]=useState([]);
  const [Timetables,setTimetables]=useState([]);
  const [Events,setEvents]=useState([]);

  return (
    <>
    <div className="adminmanagement-main">
      <h2>Manage College Administration</h2>
      <div className="adminmanagement-cards">
          <div className="adminmanagent-card">
            <h3>Departments</h3>
            <table className="card-table">
              <thead>
                <th>Department Id</th>
                <th>Department</th>
                <th>HOD</th>
                
              </thead>
              <tbody>
                <tr>
                  <td>243</td>
                  <td>ARTIFICIAL INTELLIGENGE AND DATA SCIENCE</td>
                  <td>MR BUBY JOSE</td>
                  
                </tr>
                <tr>
                   <td>13</td>
                  <td>COMPUTER SCIENCE</td>
                  <td>MR BUBY JOSE</td>
                 
                </tr>
              </tbody>
            </table>
            <button>Manage Departments</button>
          </div>
          <div className="adminmanagent-card">
            <h3>Courses</h3>
            <table className="card-table">
              <thead>
                <th>COURSE ID</th>
                <th>COURSE</th>
                <th>SEMESTER</th>
              </thead>
              <tbody>
                <tr>
                  <td>MA3354</td>
                  <td>Discrete Mathematics </td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>CS3351</td>
                  <td>Digital Principles and Computer Organization </td>
                  <td>5</td>
                </tr>
              </tbody>
            </table>
            <button>Manage courses</button>
          </div>
          <div className="adminmanagent-card">
  <h3>Timetables</h3>
  <div className="timetable-head">
    <p><b>DEPT:</b>ARTIFICIAL INTELIGENCE AND DATA SCIENCE</p>
    <p><b>HALL NO:</b>C201</p> 
    <p><b>YEAR/SEM:</b>III/05</p>
    <p><b>W.E.F:</b>2025-08-18</p>
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
  <button>Manage Timetable</button>
</div>


          <div className="adminmanagent-card">
            <h3>Events</h3>
            <table className="card-table">
              <thead>
                <th>EVENT NAME</th>
                <th>DATE</th>
                <th>BY</th>
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
            <button>Manage events</button>
          </div>

      </div>

    </div>
    </>
  )
}

export default AdminClasses
