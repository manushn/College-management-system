import React, { useEffect, useState } from 'react';
import "./css/admindepmanage.css";
import axios from "axios";



function AdminDepManage({setActiveTab,setEmessage,setMessage}) {

  const [Departments,setDepartments]=useState([]);
  const [ShowAdd,setShowAdd]=useState(false);
  const [Isloading,setIsloading]=useState(false)
  const [Isedit,setIsedit]=useState(false)
  const [deleteConfirm,setdeleteConfirm]=useState(false);

  const [depid,setdepid]=useState("");
  const [predepid,setpredipid]=useState("");
  const [depname,setdepname]=useState("");
  const [dephod,setdephod]=useState("");
  const [dephodid,setdephodid]=useState("");

  const [confirmcheck,setconfirmcheck]=useState("");
  const [deleteDeptId,setdeleteDeptId]=useState("");



  const [namesuggest,setnamesuggest]=useState([])


 
  useState(()=>{
      if(dephod.length<1){
          setdephodid("");
      }
    },[dephod])

//-------------------------------------------------------------------------------
  const submitDep=async(e)=>{
    e.preventDefault();
    
    try{
      

        if(!depid||!depname||!dephod||!dephodid){
          setEmessage("Enter All Details In Field!")
          return
        }

        if(Isloading){
          setnamesuggest([])
          return
        }

        const Token =localStorage.getItem("Token")

      if(Isedit){
        const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/admin/editdep`,
        {depid,depname,dephod,dephodid,predepid},
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
        setMessage(response.data.message)
        setActiveTab(false);
      }
      }else{
        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/adddep`,
        {depid,depname,dephod,dephodid},
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
        setMessage(response.data.message)
        setActiveTab(false);
      }
      }
        

    }catch(err){
      console.log("Error in Dep management:",err);
    }finally{
      setIsloading(false)
    }
    
  }
//-------------------------------------------------------------------------------
  useEffect(() => {
  const getstaffname = async () => {
    
    if(dephod.length<1){
      setdephodid("");
      setnamesuggest([]);
      return
    }
    const Token = localStorage.getItem("Token");

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/staffnamesug`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        params: { typedName: dephod },  
      }
    );

    if (response.data.suggestions) {
      setnamesuggest(response.data.suggestions);
      
    }
  };

  getstaffname();
}, [dephod]);

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
        setDepartments([]);
      }
      if(response.data.success){
        setDepartments(response.data.departments)
      }

      }catch(err){
        console.log("Error in fetching dep:",err)
      }

    }     

  
  useEffect(()=>{
    fetchdep();
    
  },[])
  


//-------------------------------------------------------------------------------
const handleEdit=(dep)=>{
  setdepid(dep.dep_id);
  setpredipid(dep.dep_id);
  setdepname(dep.dep_name);
  setdephod(dep.dep_hod);
  setdephodid(dep.dep_hodid);
  setIsedit(true);
  setShowAdd(true)

}
//-------------------------------------------------------------------------------




  return (
    <>
    <div className="admin-dep-manag-main">
      <div className="admin-dep-main-head">
        <h2>Manage Departments</h2>
        <button onClick={(e)=>(setActiveTab(""))}>Back</button>
      </div>
      <div className="admin-dep-main-body">
      {ShowAdd?(
          <>
          <div className="admin-dep-add-main">
            
            <div className="admin-dep-add-form">
              <h3>Add Department</h3>
              <form onSubmit={submitDep}>
              <div className="admin-dep-add-form-con">
                  <label>Department ID</label>
                  <input 
                      type="text" 
                      placeholder='Department ID'
                      value={depid}
                      disabled={Isedit}
                      onChange={(e)=>{setdepid(e.target.value.toUpperCase())}}
                  />
              </div>
              <div className="admin-dep-add-form-con">
                  <label>Department HOD Name</label>
                  <input 
                      type="text" 
                      placeholder='Type for name suggesion'
                      value={dephod}
                      onChange={(e)=>{setdephod(e.target.value.toUpperCase());setdephodid("")}}
                  />
              </div>

              <div className="admin-dep-add-form-con">
                  <label>Department Name</label>
                  <input 
                      type="text" 
                      placeholder='Department Name'
                      value={depname}
                      onChange={(e)=>{setdepname(e.target.value.toUpperCase())}}
                  />
              </div>

              
              <div className="admin-adddep-btn">
                <button type='submit'>{Isloading?('Adding...'):('Add')}</button>
                <button onClick={()=>{setShowAdd(false);
                                      setdephod("");
                                      setdephodid("");
                                      setdepname("");
                                      setdepid("");
                                      setpredipid("");
                                      setIsedit(false);
                                }}>Cancel</button>
                

              </div>

              

              </form>
              
            </div>
            {namesuggest.length>0&&(

          <div className="suggesionpopup">
            {
              namesuggest.map((user)=>(
                <p onClick={()=>{setdephod(user.staffname);setdephodid(user.username);setnamesuggest([])}}>{user.staffname}</p>
              ))
            }
            
          </div>

          )}

          </div>
          
          
          
          </>
      ):(
          <>
          <div className="admi-dep-table">
            <div className="adminmanagent-card">
            <h3>Departments</h3>
            <table className="card-table">
              <thead>
                <tr>
                <th>Department Id</th>
                <th>Department</th>
                <th>HOD</th>
                <th>HOD ID</th>
                <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Departments.length === 0 ? (
                  <tr>
                    <td colSpan="5" style={{ textAlign: "center" }}>
                        No departments found.
                    </td>
                  </tr>
                ) : (
                Departments.map((dep) => (
                  <tr key={dep.dep_id}>
                      <td>{dep.dep_id}</td>
                      <td>{dep.dep_name}</td>
                      <td>{dep.dep_hod}</td>
                      <td>{dep.dep_hodid}</td>
                      <td>
                        <button className='dep-edit-btn' onClick={()=>{handleEdit(dep)}}>Edit</button>
                      </td>
                  </tr>
                  ))
                )}
              </tbody>
            </table>
            <button onClick={()=>{setShowAdd(true)}}>Add Department</button>
          </div>
          

          </div>
          </>
      )}
        
      </div>

      

    </div>
    
    </>
  )
}

export default AdminDepManage
