import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "./css/admintimetable.css";
import "./css/Adminclasses.css"

function TimeTableManage({setActiveTab,setEmessage,setMessage}) {

  const [IsAdd,setIsAdd]=useState(false);
  const [IsEdit,setIsedit]=useState(false);
  const [Isloading,setIsloading]=useState(false);

  const [timetable, setTimetable] = useState({
    dep: "",
    sem: "",
    hall_no:"",
    division: "1",
    wef:"",
    status: "active",
    rd1cd1: "", rd1cd2: "", rd1cd3: "", rd1cd4: "", rd1cd5: "", rd1cd6: "", rd1cd7: "",
    rd2cd1: "", rd2cd2: "", rd2cd3: "", rd2cd4: "", rd2cd5: "", rd2cd6: "", rd2cd7: "",
    rd3cd1: "", rd3cd2: "", rd3cd3: "", rd3cd4: "", rd3cd5: "", rd3cd6: "", rd3cd7: "",
    rd4cd1: "", rd4cd2: "", rd4cd3: "", rd4cd4: "", rd4cd5: "", rd4cd6: "", rd4cd7: "",
    rd5cd1: "", rd5cd2: "", rd5cd3: "", rd5cd4: "", rd5cd5: "", rd5cd6: "", rd5cd7: "",

    rs1cs1: "", rs1cs2: "", rs1cs3: "", rs1cs4: "", rs1cs5: "", rs1cs6: "", rs1cs7: "",
    rs2cs1: "", rs2cs2: "", rs2cs3: "", rs2cs4: "", rs2cs5: "", rs2cs6: "", rs2cs7: "",
    rs3cs1: "", rs3cs2: "", rs3cs3: "", rs3cs4: "", rs3cs5: "", rs3cs6: "", rs3cs7: "",
    rs4cs1: "", rs4cs2: "", rs4cs3: "", rs4cs4: "", rs4cs5: "", rs4cs6: "", rs4cs7: "",
    rs5cs1: "", rs5cs2: "", rs5cs3: "", rs5cs4: "", rs5cs5: "", rs5cs6: "", rs5cs7: ""
  });

  const [departments,setdepartments]=useState([]);
  const [Timetables,setTimetables]=useState([]);

  const [filterdep,setfilterdep]=useState("");
  const [filterhallno,setfilterhallno]=useState("");
  const [filtersem,setfiltersem]=useState("");
  const [filterdiv,setfilterdiv]=useState("");

 
  const [StaffcodeSearch,setStaffcodeSearch]=useState('');
  const [CoursecodeSearch,setCoursecodeSearch]=useState("");
  const [CourseCodeSug,setCourseCodeSug]=useState([]);
  const [StaffCodeSug,setStaffCodeSug]=useState([]);
  const [Currentpositon,setCurrentposition]=useState("");
  const [Currentstaffposition,setCurrentstaffposition]=useState("");

//-------------------------------------------------------------------------------
  const fetchStaffCode =async()=>{
      try{

            if(StaffcodeSearch.length<1||StaffcodeSearch.length>3) return;
            

            const Token = localStorage.getItem("Token");

            const response = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/admin/staffnamesug`,
                  {
                  headers: {
                  Authorization: `Bearer ${Token}`,
                  "Content-Type": "application/json",
                  },
                  params: { typedName: StaffcodeSearch },  
                  }
            );

            if (response.data.suggestions) {
                  setStaffCodeSug(response.data.suggestions);
      
            }
      
      }catch(err){
            console.log("Error in Fetching staff Code",err)
      }
  } 
  //-------------------------------------------------------------------------------

  useEffect(() => {
      if(StaffcodeSearch.length<1||StaffcodeSearch.length>3){
            setStaffCodeSug([]);
      }
  fetchStaffCode();
}, [StaffcodeSearch]);

//-------------------------------------------------------------------------------

const fetchCourseCode =async()=>{
      try{

            if(CoursecodeSearch.length<1||CoursecodeSearch.length>5) return;

            const Token = localStorage.getItem("Token");

            const response = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/admin/coursecodesug`,
                  {
                  headers: {
                  Authorization: `Bearer ${Token}`,
                  "Content-Type": "application/json",
                  },
                  params: { typedName: CoursecodeSearch },  
                  }
            );

            if (response.data.courseCode) {
                  setCourseCodeSug(response.data.courseCode);
      
            }
      
      }catch(err){
            console.log("Error in Fetching course Code",err)
      }
  } 
//-------------------------------------------------------------------------------

useEffect(() => {
      if(CoursecodeSearch.length<1||CoursecodeSearch.length>5){
            setCourseCodeSug([]);
      }
  fetchCourseCode();
  
}, [CoursecodeSearch]);
//-------------------------------------------------------------------------------

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
//-------------------------------------------------------------------------------

  const validateTimetable = () => {
  for (let key in timetable) {
    if (!timetable[key] || timetable[key].toString().trim() === "") {
      return false; 
    }
  }
  return true;
};

//-------------------------------------------------------------------------------

const handleSubmit = async () => {
  if (!validateTimetable()) {
    setEmessage("Please fill all timetable fields before saving.");
    return;
  }

  const Token = localStorage.getItem("Token");

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/addtimetable`,
      timetable,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setMessage("Timetable added successfully");
      setActiveTab("managetimetable");
      setIsAdd(false);
    } else {
      setEmessage("Failed to save timetable");
    }
  } catch (err) {
    console.error("Error saving timetable:", err);
    setEmessage("Server error while saving timetable");
  }
};
//-------------------------------------------------------------------------------
const fetchtimetable = async () => {
    const Token = localStorage.getItem("Token");
    try {
      setIsloading(true);
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
      setIsloading(false)
    }
  };

//-------------------------------------------------------------------------------
  useEffect(()=>{
      
      fetchdep();
      fetchtimetable();

  },[IsAdd])
//-------------------------------------------------------------------------------

  return (
    <div className="admin-timetable-main">
      <div className="admin-timetable-head">
        <h2>Manage TimeTables</h2>
        <button onClick={(e)=>(setActiveTab(""))}>Back</button>
      </div>
      <div className="admin-timetable-body">
        {IsAdd?(
          <>
          <div className="admin-timetable-add-main">
              <div className="adminmanagent-tablecard">
  
                <h3>Add Timetable</h3>
                <div className="timetable-head">
                    <p>
                      <b>DEPT:</b>
                      <select value={timetable.dep} onChange={ (e)=>setTimetable({...timetable, dep: e.target.value })} required>
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                        <option key={dep.dep_name} value={dep.name}>
                              {dep.dep_name}
                        </option>
                        ))}
                      </select>
                      
                    </p>

                    <p>
                       <b>HALL NO:</b>
                        <input 
                             type="text"
                             value={timetable.hall_no}
                             onChange={(e) => setTimetable({ ...timetable, hall_no: e.target.value .toUpperCase()})}
                             required
                        />
                    </p> 

                    <p>
                        <b>SEM:</b>
                        <select value={timetable.sem} onChange={(e) => setTimetable({ ...timetable, sem: e.target.value })} required>
                          <option value="">Semester</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <option key={s} value={s}>
                                    {s}
                              </option>
                              ))}
                        </select>
                        
                    </p>

                    <p>
                        <b>DIVISION:</b>
                        <select value={timetable.division} onChange={(e) => setTimetable({ ...timetable, division: e.target.value })} required>
                          <option value="">DIVISION</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <option key={s} value={s}>
                                    {s}
                              </option>
                              ))}
                        </select>
                        
                    </p>

                    <p>
                      <b>W.E.F:</b>
                      <input 
                        type="date"
                        value={timetable.wef}
                        onChange={(e) => setTimetable({ ...timetable, wef: e.target.value })}
                        required 
                      />
                    </p>
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
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd1} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd1')
                                          setCurrentstaffposition('rs1cs1')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs1} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>

                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd2} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd2')
                                          setCurrentstaffposition('rs1cs2')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs2} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>

                      <td className="break-col"></td>

                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd3} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd3')
                                          setCurrentstaffposition('rs1cs3')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs3} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>

                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd4} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd4')
                                          setCurrentstaffposition('rs1cs4')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs4} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd5} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd5')
                                          setCurrentstaffposition('rs1cs5')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs5} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd6} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd6')
                                          setCurrentstaffposition('rs1cs6')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs6} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd7} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd1cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd7')
                                          setCurrentstaffposition('rs1cs7')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs1cs7} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Tuesday</td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd1} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd1')
                                          setCurrentstaffposition('rs2cs1')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs1} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd2} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd2')
                                          setCurrentstaffposition('rs2cs2')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs2} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd3} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd3')
                                          setCurrentstaffposition('rs2cs3')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs3} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd4} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd4')
                                          setCurrentstaffposition('rs2cs4')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs4} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd5} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd5')
                                          setCurrentstaffposition('rs2cs5')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs5} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd6} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd6')
                                          setCurrentstaffposition('rs2cs6')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs6} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd7} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd2cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd7')
                                          setCurrentstaffposition('rs2cs7')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs2cs7} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>

                    </tr>
                    <tr>
                      <td>Wednesday</td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd1} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd1')
                                          setCurrentstaffposition('rs3cs1')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs1} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd2} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd2')
                                          setCurrentstaffposition('rs3cs2')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs2} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd3} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd3')
                                          setCurrentstaffposition('rs3cs3')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs3} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd4} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd4')
                                          setCurrentstaffposition('rs3cs4')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs4} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd5} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd5')
                                          setCurrentstaffposition('rs3cs5')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs5} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd6} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd6')
                                          setCurrentstaffposition('rs3cs6')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs6} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd7} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd3cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd7')
                                          setCurrentstaffposition('rs3cs7')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs3cs7} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                    </tr>
                    <tr>

                      <td>Thursday</td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd1} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd1')
                                          setCurrentstaffposition('rs4cs1')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs1} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd2} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd2')
                                          setCurrentstaffposition('rs4cs2')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs2} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd3} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd3')
                                          setCurrentstaffposition('rs4cs3')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs3} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd4} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd4')
                                          setCurrentstaffposition('rs4cs4')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs4} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd5} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd5')
                                          setCurrentstaffposition('rs4cs5')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs5} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd6} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd6')
                                          setCurrentstaffposition('rs4cs6')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs6} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd7} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd4cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd7')
                                          setCurrentstaffposition('rs4cs7')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs4cs7} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                    </tr>
                    <tr>
                      <td>Friday</td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd1} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd1')
                                          setCurrentstaffposition('rs5cs1')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs1} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd2} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd2')
                                          setCurrentstaffposition('rs5cs2')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs2} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                       <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd3} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd3')
                                          setCurrentstaffposition('rs5cs3')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs3} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd4} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd4')
                                          setCurrentstaffposition('rs5cs4')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs4} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd5} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd5')
                                          setCurrentstaffposition('rs5cs5')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs5} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd6} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd6')
                                          setCurrentstaffposition('rs5cs6')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs6} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd7} 
                                placeholder='SUB CODE'
                                maxLength={6}
                                onChange={(e) => {
                                          const value = e.target.value.toUpperCase().trim();
                                          setTimetable({ ...timetable, rd5cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd7')
                                          setCurrentstaffposition('rs5cs7')
                              }}/>
                          </div>
                          <div><input 
                                type="text"
                                defaultValue={timetable.rs5cs7} 
                                placeholder='STAFF CODE'
                                maxLength={4}
                                />
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="addtimetable-btn">
                <button onClick={()=>{handleSubmit()}}>Add Timetable</button>
                <button onClick={()=>{setIsAdd(false)}}>Cancel</button>
                </div>
              </div>
              
          </div>
          
          </>
        ):(
          <>
          <div className="timetable-view-admin-main">
            <h2>Timetables</h2>
            <div className="timetable-view-filter">
                  <p>Filter by:</p>
                  <p>
                      <b>DEPT:</b>
                      <select value={filterdep} onChange={ (e)=>setfilterdep(e.target.value)} required>
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                        <option key={dep.dep_id} value={dep.dep_id}>
                              {dep.dep_name}
                        </option>
                        ))}
                      </select>
                      
                    </p>

                    <p>
                       <b>HALL NO:</b>
                        <input 
                             type="text"
                             value={filterhallno}
                             onChange={(e) => setfilterhallno(e.target.value.toUpperCase().trim())}
                             required
                        />
                    </p> 

                    <p>
                        <b>SEM:</b>
                        <select value={filtersem} onChange={(e) => setfiltersem(e.target.value)} required>
                          <option value="">Semester</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <option key={s} value={s}>
                                    {s}
                              </option>
                              ))}
                        </select>
                        
                    </p>

                    <p>
                        <b>DIVISION:</b>
                        <select value={filterdiv} onChange={(e) => setfilterdiv(e.target.value)} required>
                          <option value="">DIVISION</option>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                              <option key={s} value={s}>
                                    {s}
                              </option>
                              ))}
                        </select>
                        
                    </p>

            </div>
            {Timetables.length>0?(
            <>
            <div className="adminmanagent-tablecard">
  
  <div className="timetable-head">
    <p><b>DEPT:</b> {Timetables[0].dep}</p>
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
            
            </>
            ):(
                  <>
                  <p>{Isloading?('Loading Timetable....'):("No Timetable available.")}</p>
                  </>

            )}
          </div>
          <div className="timetable-add-btn">
            <button onClick={()=>{setIsAdd(true)}}>Add Timetable</button>
          </div>
          </>
        )}
      </div>
      {CourseCodeSug.length>0&&(
                  <div className="suggesionpopup-main">
                        <div className="suggesionpopup-box">
                              <button onClick={()=>{setCourseCodeSug([])}}>X</button>
                              <div className="suggesionpopup-con">
                                    {CourseCodeSug.map((c, i) => (
                                          <p 
                                            key={i} 
                                            onClick={() => {
                                              setTimetable({ ...timetable, [Currentpositon]: c.course_code,[Currentstaffposition]:c.staff_code });
                                              setCourseCodeSug([]);
                                              setCurrentposition("")
                                            }}
                                          >
                                            ({c.course_code}) - ({c.course_name}) - ({c.staff_code})
                                          </p>
                                    ))}
                              </div>
                        </div>
                        
                  </div>
              )}

              
    </div>
  )
}

export default TimeTableManage