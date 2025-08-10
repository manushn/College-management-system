import React, { lazy, useState } from 'react'
import "./css/adminstaff.css"
const AddStaff=lazy(()=>import("./AddStaff"));


function AdminStaff() {

  const [Search,setSearch]=useState("");

  return (
    <div className="adminstaff-main">
      <div className="adminstaff-header">
        <h2>Manage Staffs</h2>  
        <div className="adminstaff-header-right">
          <input 
          type="text"
          placeholder='Search'
          value={Search}
          onChange={(e)=>{setSearch(e.target.value.trim())}}
          />

          <button>Add Staff</button>
        </div>  
        
      </div>


      <div className="adminstaff-body">
        <AddStaff/>
      </div>
    </div>
  )
}

export default AdminStaff

