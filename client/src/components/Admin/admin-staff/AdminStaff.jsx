import React, { lazy, useState } from 'react'

import "./css/adminstaff.css";

import AddStaff from './AddStaff';
import AdminStaffView from './AdminStaffView';

import ErrorPopup from '../../../pages/Others/ErrorPopup';
import MessagePopup from '../../../pages/Others/MessagePopup';


function AdminStaff() {

  const [Search,setSearch]=useState("");
  const [StaffAdd,setStaffAdd]=useState(false);

  const [Emessage, setEmessage] = useState("");
  const [Message, setMessage] = useState("");


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

          <button onClick={()=>{(setStaffAdd(true))}}>Add Staff</button>
        </div>  
        
      </div>


      <div className="adminstaff-body">
        {StaffAdd?(
            <AddStaff 
              setStaffAdd={setStaffAdd} 
              setEmessage={setEmessage} 
              setMessage={setMessage} 
            />
        ):(
          <>
            <AdminStaffView
            setEmessage={setEmessage}
            />         
          </>
        )}
        
      </div>

      <ErrorPopup emessage={Emessage} onClose={() => setEmessage("")} />
      <MessagePopup message={Message} onClose={() => setMessage("")} />
    </div>
  )
}

export default AdminStaff

