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
  const [EditTableid,setEditTableid]=useState("");

  const [departments,setdepartments]=useState([]);
  const [Timetables,setTimetables]=useState([]);
  const [TimetableDescribe,setTimetableDescribe]=useState([]);

  const [filterdep,setfilterdep]=useState("");
  const [filterhallno,setfilterhallno]=useState("");
  const [filtersem,setfiltersem]=useState("");
  const [filterdiv,setfilterdiv]=useState("1");

 
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
            

            const Token = sessionStorage.getItem("Token");;

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

            const Token = sessionStorage.getItem("Token");;

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
    const Token = sessionStorage.getItem("Token");;
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

  const preparedTimetable = {
    ...timetable,
    wef: timetable.wef ? timetable.wef.split('T')[0] : null
  };
  const Token = sessionStorage.getItem("Token");;

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/addtimetable`,
      {timetable:preparedTimetable},
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
      resetForm();
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
    const Token = sessionStorage.getItem("Token");;
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
        setTimetables(response.data.timetable.Timetable);
        setTimetableDescribe(response.data.timetable.TimetableDescribe)
      }
    } catch (err) {
      console.log("Error in fetching dep:", err);
    }finally{
      setIsloading(false)
    }
  };


//-------------------------------------------------------------------------------

const handleEdit = (index) => {
    const selectedTimetable = Timetables[index];
    setEditTableid(selectedTimetable.id || "")
    setTimetable({
        dep: selectedTimetable.dep || "",
        sem: selectedTimetable.sem || "",
        hall_no: selectedTimetable.hall_no || "",
        division: selectedTimetable.division || "1",
        wef: selectedTimetable.wef || "",
        status: selectedTimetable.status || "active",
        rd1cd1: selectedTimetable.rd1cd1 || "",
        rd1cd2: selectedTimetable.rd1cd2 || "",
        rd1cd3: selectedTimetable.rd1cd3 || "",
        rd1cd4: selectedTimetable.rd1cd4 || "",
        rd1cd5: selectedTimetable.rd1cd5 || "",
        rd1cd6: selectedTimetable.rd1cd6 || "",
        rd1cd7: selectedTimetable.rd1cd7 || "",
        rd2cd1: selectedTimetable.rd2cd1 || "",
        rd2cd2: selectedTimetable.rd2cd2 || "",
        rd2cd3: selectedTimetable.rd2cd3 || "",
        rd2cd4: selectedTimetable.rd2cd4 || "",
        rd2cd5: selectedTimetable.rd2cd5 || "",
        rd2cd6: selectedTimetable.rd2cd6 || "",
        rd2cd7: selectedTimetable.rd2cd7 || "",
        rd3cd1: selectedTimetable.rd3cd1 || "",
        rd3cd2: selectedTimetable.rd3cd2 || "",
        rd3cd3: selectedTimetable.rd3cd3 || "",
        rd3cd4: selectedTimetable.rd3cd4 || "",
        rd3cd5: selectedTimetable.rd3cd5 || "",
        rd3cd6: selectedTimetable.rd3cd6 || "",
        rd3cd7: selectedTimetable.rd3cd7 || "",
        rd4cd1: selectedTimetable.rd4cd1 || "",
        rd4cd2: selectedTimetable.rd4cd2 || "",
        rd4cd3: selectedTimetable.rd4cd3 || "",
        rd4cd4: selectedTimetable.rd4cd4 || "",
        rd4cd5: selectedTimetable.rd4cd5 || "",
        rd4cd6: selectedTimetable.rd4cd6 || "",
        rd4cd7: selectedTimetable.rd4cd7 || "",
        rd5cd1: selectedTimetable.rd5cd1 || "",
        rd5cd2: selectedTimetable.rd5cd2 || "",
        rd5cd3: selectedTimetable.rd5cd3 || "",
        rd5cd4: selectedTimetable.rd5cd4 || "",
        rd5cd5: selectedTimetable.rd5cd5 || "",
        rd5cd6: selectedTimetable.rd5cd6 || "",
        rd5cd7: selectedTimetable.rd5cd7 || "",
        rs1cs1: selectedTimetable.rs1cs1 || "",
        rs1cs2: selectedTimetable.rs1cs2 || "",
        rs1cs3: selectedTimetable.rs1cs3 || "",
        rs1cs4: selectedTimetable.rs1cs4 || "",
        rs1cs5: selectedTimetable.rs1cs5 || "",
        rs1cs6: selectedTimetable.rs1cs6 || "",
        rs1cs7: selectedTimetable.rs1cs7 || "",
        rs2cs1: selectedTimetable.rs2cs1 || "",
        rs2cs2: selectedTimetable.rs2cs2 || "",
        rs2cs3: selectedTimetable.rs2cs3 || "",
        rs2cs4: selectedTimetable.rs2cs4 || "",
        rs2cs5: selectedTimetable.rs2cs5 || "",
        rs2cs6: selectedTimetable.rs2cs6 || "",
        rs2cs7: selectedTimetable.rs2cs7 || "",
        rs3cs1: selectedTimetable.rs3cs1 || "",
        rs3cs2: selectedTimetable.rs3cs2 || "",
        rs3cs3: selectedTimetable.rs3cs3 || "",
        rs3cs4: selectedTimetable.rs3cs4 || "",
        rs3cs5: selectedTimetable.rs3cs5 || "",
        rs3cs6: selectedTimetable.rs3cs6 || "",
        rs3cs7: selectedTimetable.rs3cs7 || "",
        rs4cs1: selectedTimetable.rs4cs1 || "",
        rs4cs2: selectedTimetable.rs4cs2 || "",
        rs4cs3: selectedTimetable.rs4cs3 || "",
        rs4cs4: selectedTimetable.rs4cs4 || "",
        rs4cs5: selectedTimetable.rs4cs5 || "",
        rs4cs6: selectedTimetable.rs4cs6 || "",
        rs4cs7: selectedTimetable.rs4cs7 || "",
        rs5cs1: selectedTimetable.rs5cs1 || "",
        rs5cs2: selectedTimetable.rs5cs2 || "",
        rs5cs3: selectedTimetable.rs5cs3 || "",
        rs5cs4: selectedTimetable.rs5cs4 || "",
        rs5cs5: selectedTimetable.rs5cs5 || "",
        rs5cs6: selectedTimetable.rs5cs6 || "",
        rs5cs7: selectedTimetable.rs5cs7 || ""
    });
    setIsedit(true);
    setIsAdd(true); 
};
//-------------------------------------------------------------------------------

const resetForm = () => {
    setTimetable({
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
};

//-------------------------------------------------------------------------------


const handleEditSubmit = async () => {
    if (!validateTimetable()) {
        setEmessage("Please fill all timetable fields before saving.");
        return;
    }
    const preparedTimetable = {
    ...timetable,
    wef: timetable.wef ? timetable.wef.split('T')[0] : null
  };

    const Token = sessionStorage.getItem("Token");;

    try {
        const response = await axios.put(
            `${import.meta.env.VITE_BACKEND_URL}/admin/updatetimetable`,
            {timetable:preparedTimetable ,id:EditTableid},
            {
                headers: {
                    Authorization: `Bearer ${Token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data.success) {
            setMessage("Timetable updated successfully");
            setIsAdd(false);
            setIsedit(false);
            resetForm();
        } else {
            setEmessage("Failed to update timetable");
        }
    } catch (err) {
        console.error("Error updating timetable:", err);
        setEmessage("Server error while updating timetable");
    }
};

//-------------------------------------------------------------------------------

const fetchfilterTimetable=async()=>{

try{

  if(filterdep.length<1&&filterdiv.length<1&&filterhallno.length<1&&filtersem.length<1) return;
    const Token=sessionStorage.getItem('Token');
    const response = await axios.get(
                  `${import.meta.env.VITE_BACKEND_URL}/admin/timetable/filter`,
                  {
                    params: {
                            dep: filterdep||"",
                            hall_no: filterhallno||"",
                            sem: filtersem||"",
                            division: filterdiv||"",
    },
    headers: {
      Authorization: `Bearer ${Token}`,
      "Content-Type": "application/json",
    },
  }
);
 if (response.data.success){
  setTimetables(response.data.timetables);
  setTimetableDescribe(response.data.TimetableDescribe)
 }else{
  setEmessage("No Timetable Available for your filter.")
  setTimetables([]);
 }

}catch(err){
  console.log("Error in fetching filterd timetable",err)
}

  
}

useEffect(()=>{
  if(filterdep.length>0&&filtersem.length>0&&filterdiv.length>0){
    fetchfilterTimetable()
  }
  if(filterdep.length<1&&filtersem.length<1&&filterdiv.length>0&&filterhallno.length>3){
    fetchfilterTimetable()
  }
  if(filterdep.length>0&&filtersem.length>0&&filterdiv.length>0&&filterhallno.length>3){
    fetchfilterTimetable()
  }
  if(filterdep.length<1&&filtersem.length<1&&filterhallno.length<1&&filterdiv.length>0){
    fetchtimetable()
    fetchdep();
  }


},[filterdep,filtersem,filterdiv,filterhallno,IsAdd])



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
  
                <h3>{IsEdit ? "Edit Timetable" : "Add Timetable"}</h3>
                <div className="timetable-head">
                    <p>
                      <b>DEPT:</b>
                      <select value={timetable.dep} onChange={ (e)=>setTimetable({...timetable, dep: e.target.value })} required>
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                        <option key={dep.dep_name} value={dep.dep_name}>
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
                        value={timetable.wef.split("T")[0]}
                        onChange={(e) => setTimetable({ ...timetable, wef: e.target.value.split("T")[0] })}
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
                                          setTimetable({ ...timetable, rs1cs1: "",rd1cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd1')
                                          setCurrentstaffposition('rs1cs1')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs1}</h4>
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
                                          setTimetable({ ...timetable, rs1cs2:"",rd1cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd2');
                                          setCurrentstaffposition('rs1cs2');
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs2} </h4>
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
                                          setTimetable({ ...timetable, rs1cs3:"",rd1cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd3')
                                          setCurrentstaffposition('rs1cs3')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs3}</h4>
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
                                          setTimetable({ ...timetable,rs1cs4:"", rd1cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd4')
                                          setCurrentstaffposition('rs1cs4')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs4} </h4>
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
                                          setTimetable({ ...timetable,rs1cs5:"", rd1cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd5')
                                          setCurrentstaffposition('rs1cs5')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs5} </h4>
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
                                          setTimetable({ ...timetable,rs1cs6:"", rd1cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd6')
                                          setCurrentstaffposition('rs1cs6')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs6} </h4>
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
                                          setTimetable({ ...timetable,rs1cs7:"", rd1cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd1cd7')
                                          setCurrentstaffposition('rs1cs7')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs1cs7} </h4>
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
                                          setTimetable({ ...timetable,rs2cs1:"", rd2cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd1')
                                          setCurrentstaffposition('rs2cs1')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs1} </h4>
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
                                          setTimetable({ ...timetable,rs2cs2:"", rd2cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd2')
                                          setCurrentstaffposition('rs2cs2')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs2} </h4>
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
                                          setTimetable({ ...timetable,rs2cs3:"", rd2cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd3')
                                          setCurrentstaffposition('rs2cs3')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs3} </h4>
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
                                          setTimetable({ ...timetable,rs2cs4:"", rd2cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd4')
                                          setCurrentstaffposition('rs2cs4')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs4}</h4>
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
                                          setTimetable({ ...timetable,rs2cs5:"", rd2cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd5')
                                          setCurrentstaffposition('rs2cs5')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs5} </h4>
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
                                          setTimetable({ ...timetable,rs2cs6:"", rd2cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd6')
                                          setCurrentstaffposition('rs2cs6')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs6}</h4>
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
                                          setTimetable({ ...timetable,rs2cs7:"", rd2cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd2cd7')
                                          setCurrentstaffposition('rs2cs7')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs2cs7}</h4>
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
                                          setTimetable({ ...timetable,rs3cs1:"", rd3cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd1')
                                          setCurrentstaffposition('rs3cs1')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs1}</h4>
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
                                          setTimetable({ ...timetable,rs3cs2:"", rd3cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd2')
                                          setCurrentstaffposition('rs3cs2')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs2}</h4>
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
                                          setTimetable({ ...timetable,rs3cs3:"", rd3cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd3')
                                          setCurrentstaffposition('rs3cs3')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs3}</h4>
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
                                          setTimetable({ ...timetable,rs3cs4:"", rd3cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd4')
                                          setCurrentstaffposition('rs3cs4')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs4} </h4>
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
                                          setTimetable({ ...timetable,rs3cs5:"", rd3cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd5')
                                          setCurrentstaffposition('rs3cs5')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs5} </h4>
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
                                          setTimetable({ ...timetable,rs3cs6:"", rd3cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd6')
                                          setCurrentstaffposition('rs3cs6')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs6}</h4>
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
                                          setTimetable({ ...timetable,rs3cs7:"", rd3cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd3cd7')
                                          setCurrentstaffposition('rs3cs7')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs3cs7}</h4>
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
                                          setTimetable({ ...timetable,rs4cs1:"", rd4cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd1')
                                          setCurrentstaffposition('rs4cs1')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs1}</h4>
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
                                          setTimetable({ ...timetable,rs4cs2:"", rd4cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd2')
                                          setCurrentstaffposition('rs4cs2')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs2}</h4>
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
                                          setTimetable({ ...timetable,rs4cs3:"", rd4cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd3')
                                          setCurrentstaffposition('rs4cs3')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs3}</h4>
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
                                          setTimetable({ ...timetable,rs4cs4:"", rd4cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd4')
                                          setCurrentstaffposition('rs4cs4')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs4} </h4>
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
                                          setTimetable({ ...timetable,rs4cs5:"", rd4cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd5')
                                          setCurrentstaffposition('rs4cs5')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs5}</h4>
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
                                          setTimetable({ ...timetable,rs4cs6:"", rd4cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd6')
                                          setCurrentstaffposition('rs4cs6')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs6}</h4>
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
                                          setTimetable({ ...timetable,rs4cs7:"", rd4cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd4cd7')
                                          setCurrentstaffposition('rs4cs7')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs4cs7}</h4>
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
                                          setTimetable({ ...timetable,rs5cs1:"", rd5cd1: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd1')
                                          setCurrentstaffposition('rs5cs1')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs1}</h4>
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
                                          setTimetable({ ...timetable,rs5cs2:"", rd5cd2: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd2')
                                          setCurrentstaffposition('rs5cs2')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs2} </h4>
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
                                          setTimetable({ ...timetable,rs5cs3:"", rd5cd3: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd3')
                                          setCurrentstaffposition('rs5cs3')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs3} </h4>
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
                                          setTimetable({ ...timetable,rs5cs4:"", rd5cd4: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd4')
                                          setCurrentstaffposition('rs5cs4')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs4} </h4>
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
                                          setTimetable({ ...timetable,rs5cs5:"", rd5cd5: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd5')
                                          setCurrentstaffposition('rs5cs5')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs5}</h4>
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
                                          setTimetable({ ...timetable,rs5cs6:"", rd5cd6: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd6')
                                          setCurrentstaffposition('rs5cs6')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs6}</h4>
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
                                          setTimetable({ ...timetable, rs5cs7:"",rd5cd7: value });
                                          setCoursecodeSearch(value);
                                          setCurrentposition('rd5cd7')
                                          setCurrentstaffposition('rs5cs7')
                              }}/>
                          </div>
                          <div><h4>{timetable.rs5cs7}</h4>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="addtimetable-btn">
                <button onClick={IsEdit ? handleEditSubmit : handleSubmit}>
                    {IsEdit ? "Update Timetable" : "Add Timetable"}
                </button>
                <button onClick={()=>{setIsAdd(false);setIsedit(false);resetForm()}}>Cancel</button>
                </div>
              </div>
              
          </div>
          
          </>
        ):(
          <>
          <div className="timetable-view-admin-main">
             
            <div className="timetable-view-head">
              <h2>Timetables</h2>
              <div className="timetable-add-btn">
                  <button onClick={()=>{setIsAdd(true)}}>Add Timetable</button>
              </div>
            </div>
           
            <div className="timetable-view-filter">
                  <p>Filter by:</p>
                  <p>
                      <b>DEPT:</b>
                      <select value={filterdep} onChange={ (e)=>setfilterdep(e.target.value)} required>
                        <option value="">Select Department</option>
                        {departments.map((dep) => (
                        <option key={dep.dep_name} value={dep.dep_name}>
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
                    <button onClick={()=>{
                      setfilterdep("");
                      setfilterdiv("1");
                      setfilterhallno("");
                      setfiltersem("");
                    }}>Clear</button>

            </div>
            {Timetables.length>0?(
            <>
            <div className="adminmanagent-tablecard">
  
  <div className="timetable-head">
    <p><b>DEPT:</b> {Timetables[0].dep}</p>
    <p><b>HALL NO:</b> {Timetables[0].hall_no}</p> 
    <p><b>SEM:</b> {Timetables[0].sem}</p>
    <p><b>DIV:</b> {Timetables[0].division}</p>
    <p><b>W.E.F:</b> {Timetables[0].wef.split("T")[0]}</p>
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
  <div className="timetable-add-btn">
                  <button onClick={() => handleEdit(0)}>Edit Timetable</button>

   </div>
   <div className="timetable-description">
    <div className="timetable-description-con">
      <table>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Staff Name</th>
          </tr>
        </thead>
        <tbody>
          {TimetableDescribe.length>0?(
            <>
            {TimetableDescribe.map((confirm,index)=>(
              <tr key={index}>
                <td>{confirm.course_code}</td>
                <td>{confirm.course_name}</td>
                <td>{confirm.staff_name}</td>
              </tr>
            ))}
            
            </>
          ):(
            <>
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                        No details found.
              </td>
            </tr>
            </>
          )}
        </tbody>
      </table>
    </div>
   </div>

</div>
            
            </>
            ):(
                  <>
                  <p>{Isloading?('Loading Timetable....'):("No Timetable available.")}</p>
                  </>

            )}
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