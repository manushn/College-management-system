import React, { useState } from 'react'
import "./css/admintimetable.css";
import "./css/Adminclasses.css"

function TimeTableManage({setActiveTab,setEmessage,setMessage}) {

  const [IsAdd,setIsAdd]=useState(true);
  const [IsEdit,setIsedit]=useState(false);

  const [timetable, setTimetable] = useState({
    dep: "",
    sem: "",
    hall_no:"",
    division: "",
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
                      <input 
                          type="text"
                          value={timetable.dep}
                          onChange={(e) => setTimetable({ ...timetable, dep: e.target.value })}
                          required 
                      />
                    </p>

                    <p>
                       <b>HALL NO:</b>
                        <input 
                             type="text"
                             value={timetable.hall_no}
                             onChange={(e) => setTimetable({ ...timetable, hall_no: e.target.value })}
                             required
                        />
                    </p> 

                    <p>
                        <b>SEM:</b>
                        <input 
                          type="text"
                          value={timetable.sem}
                          onChange={(e) => setTimetable({ ...timetable, sem: e.target.value })}
                          required 
                        />
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
                                onChange={(e) => setTimetable({ ...timetable, rd1cd1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs1} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>

                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd2} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs2} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>

                      <td className="break-col"></td>

                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd3} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs3} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>

                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd4} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs4} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd5} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs5} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd6} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs6} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd1cd7} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd1cd7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs1cs7} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs1cs7: e.target.value.toUpperCase().trim() })}/>
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
                                onChange={(e) => setTimetable({ ...timetable, rd2cd1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs1} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd2} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs2} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                     <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd3} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs3} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd4} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs4} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd5} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs5} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd6} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs6} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd2cd7} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd2cd7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs2cs7} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs2cs7: e.target.value.toUpperCase().trim() })}/>
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
                                onChange={(e) => setTimetable({ ...timetable, rd3cd1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs1} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd2} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs2} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd3} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs3} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd4} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs4} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd5} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs5} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd6} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs6} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd3cd7} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd3cd7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs3cs7} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs3cs7: e.target.value.toUpperCase().trim() })}/>
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
                                onChange={(e) => setTimetable({ ...timetable, rd4cd1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs1} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd2} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs2} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd3} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs3} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd4} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs4} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd5} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs5} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd6} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs6} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd4cd7} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd4cd7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs4cs7} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs4cs7: e.target.value.toUpperCase().trim() })}/>
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
                                onChange={(e) => setTimetable({ ...timetable, rd5cd1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs1} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd2} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs2} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs2: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                       <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd3} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs3} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs3: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd4} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs4} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs4: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd5} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs5} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs5: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd6} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd6: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs6} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs1: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                      <td className="break-col"></td>
                      <td>
                        <div><input 
                                type="text"
                                value={timetable.rd5cd7} 
                                placeholder='SUB CODE'
                                onChange={(e) => setTimetable({ ...timetable, rd5cd7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                          <div><input 
                                type="text"
                                value={timetable.rs5cs7} 
                                placeholder='STAFF CODE'
                                onChange={(e) => setTimetable({ ...timetable, rs5cs7: e.target.value.toUpperCase().trim() })}/>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="addtimetable-btn">
                <button onClick={()=>{setActiveTab('managetimetable')}}>Manage Timetable</button>
                <button onClick={()=>{setIsAdd(false)}}>Cancel</button>
                </div>
              </div>
          </div>
          </>
        ):(
          <>
          
          </>
        )}
      </div>
    </div>
  )
}

export default TimeTableManage
