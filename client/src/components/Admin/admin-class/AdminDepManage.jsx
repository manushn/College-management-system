import React, { useEffect, useState } from 'react';
import "./css/admindepmanage.css";
import axios from "axios";


function AdminDepManage({setActiveTab,setEmessage,setMessage}) {

  const [Departments,setDepartments]=useState([]);
  const [ShowAdd,setShowAdd]=useState(true);
  const [Isloading,setIsloading]=useState(false)

  const [depid,setdepid]=useState("");
  const [depname,setdepname]=useState("");
  const [dephod,setdephod]=useState("");
  const [dephodid,setdephodid]=useState("");

  const [namesuggest,setnamesuggest]=useState([])
 
useState(()=>{
if(dephod.length<1){
  setdephodid("");
}
},[dephod])


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

        const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/adddep`,
        {depid,depname,dephod},
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

    }catch(err){
      console.log("Error in Dep management:",err);
    }finally{
      setIsloading(false)
    }
    
  }

  useEffect(() => {
  const getstaffname = async () => {
    const Token = localStorage.getItem("Token");

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/admin/staffnamesug`,
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
        params: { typedName: dephod },  // <-- pass typedName here
      }
    );

    if (response.data.suggestions) {
      setnamesuggest(response.data.suggestions);
      console.log(response.data.suggestions);
    }
  };

  getstaffname();
}, [dephod]);




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
                      onChange={(e)=>{setdepid(e.target.value.toUpperCase())}}
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

              <div className="admin-dep-add-form-con">
                  <label>Department HOD Name</label>
                  <input 
                      type="text" 
                      placeholder='Type for name suggesion'
                      value={dephod}
                      onChange={(e)=>{setdephod(e.target.value.toUpperCase())}}
                  />
              </div>
              <div className="admin-adddep-btn">
                <button onClick={()=>{setShowAdd(false)}}>Cancel</button>
                <button type='submit'>{Isloading?('Adding...'):('Add')}</button>
                

              </div>

              

              </form>
              
            </div>
          </div>
          
          </>
      ):(
          <>
          <div className="admi-dep-table">
            <table>
              <thead>
                <tr>
                  <th>DEPARTMRNT ID</th>
                  <th>DEPARTMENT NAME</th>
                  <th>DEPARTMENT HOD</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>

          </div>
          </>
      )}
        
      </div>

      

    </div>
    
    </>
  )
}

export default AdminDepManage
