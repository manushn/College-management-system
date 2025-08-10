import React, { useState } from 'react';
import axios from "axios";

import "./css/addstaff.css";
import ErrorPopup from '../../../pages/Others/ErrorPopup';
import MessagePopup from '../../../pages/Others/MessagePopup';

function AddStaff() {
  const [staffData, setStaffData] = useState({
    prefix: "",
    first_name: "",
    last_name: "",
    gender: "",
    date_of_birth: "",
    photo_url: "",
    phone_number: "",
    email: "",
    personal_email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    emergency_contact_name: "",
    emergency_contact_number: "",
    designation: "",
    department: "",
    role_type: "",
    employment_type: "",
    reporting_manager: "",
    staff_status: "",
    aadhar_number: "",
    pan_number: "",
    bank_account_number: "",
    bank_name: "",
    ifsc_code: "",
    salary: "",
    highest_qualification: "",
    specialization: "",
    role: "",
  });
  const [Emessage,setEmessage]=useState("");
  const [Message,setMessage]=useState("");
  
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
  };

  
  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setStaffData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const TestEmail = (email) => {
  const emailformate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailformate.test(email.trim());
};

    const TestPhone=(phone)=>{
        if(phone.length===0){
            return true
        }else{
            return false
        }
    };

  
  const handleSubmit =async (e) => {
    e.preventDefault();

    if(!TestEmail(staffData.email)){
        setEmessage("Enter a valid Email")
        return
    }
    if(!TestEmail(staffData.personal_email)){
        setEmessage("Enter a valid Personal Email")
        return
    }
    if(!TestPhone(staffData.phone_number)){
        setEmessage("Enter a valid Phone Number")
        return
    }
    if(!TestPhone(staffData.emergency_contact_number)){
        setEmessage("Enter a valid Emergency Contact number")
        return
    }

    try{

        const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/admin/addstaff`,
          {FormData},
          {
            headers: {
              Authorization: `Bearer ${Token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if(response.data.emessage){
            setEmessage(response.data.emessage)
        }
        
        if(response.data.success){
            setMessage("Staff Added")
             setStaffData({
        prefix: "",
        first_name: "",
        last_name: "",
        gender: "",
        date_of_birth: "",
        photo_url: "",
        phone_number: "",
        email: "",
        personal_email: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        emergency_contact_name: "",
        emergency_contact_number: "",
        designation: "",
        department: "",
        role_type: "",
        employment_type: "",
        reporting_manager: "",
        staff_status: "",
        aadhar_number: "",
        pan_number: "",
        bank_account_number: "",
        bank_name: "",
        ifsc_code: "",
        salary: "",
        highest_qualification: "",
        specialization: "",
        role: "",
            });
        }
        
        

    }catch(error){
        console.log("Error in staff add:",error)
    }

    
    
  };

  return (
    <div className="admin-addstaff-main">
      <div className="admin-addstaff-head">
        <h3>Add Staff</h3>
        <button type="button">Back</button>
      </div>

      <div className="admin-addstaff-form">
        <form onSubmit={handleSubmit}>

          
          <select name="prefix" value={staffData.prefix} onChange={handleTextChange} required>
            <option value="">Select Prefix</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>

          
          <input type="text" name="first_name" value={staffData.first_name} onChange={handleTextChange} placeholder="First Name" required />
          <input type="text" name="last_name" value={staffData.last_name} onChange={handleTextChange} placeholder="Last Name" required />

          
          <select name="gender" value={staffData.gender} onChange={handleTextChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          
          <input
            type={staffData.date_of_birth ? "date" : "text"}
            name="date_of_birth"
            value={staffData.date_of_birth}
            onChange={handleTextChange}
            onFocus={(e) => e.target.type = "date"}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            placeholder="Date of Birth"
            required
          />

          
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="phone_number" value={staffData.phone_number} onChange={handleNumberChange} placeholder="Phone Number" required />
          <input type="email" name="email" value={staffData.email} onChange={handleTextChange} placeholder="Work Email" required />
          <input type="email" name="personal_email" value={staffData.personal_email} onChange={handleTextChange} placeholder="Personal Email" required />

          
          <textarea name="address" value={staffData.address} onChange={handleTextChange} placeholder="Address" required></textarea>
          <input type="text" name="city" value={staffData.city} onChange={handleTextChange} placeholder="City" required />
          <input type="text" name="state" value={staffData.state} onChange={handleTextChange} placeholder="State" required />
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="pincode" value={staffData.pincode} onChange={handleNumberChange} placeholder="Pincode" required />

          
          <input type="text" name="emergency_contact_name" value={staffData.emergency_contact_name} onChange={handleTextChange} placeholder="Emergency Contact Name" required />
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="emergency_contact_number" value={staffData.emergency_contact_number} onChange={handleNumberChange} placeholder="Emergency Contact Number" required />

          
          <input type="text" name="designation" value={staffData.designation} onChange={handleTextChange} placeholder="Designation" required />
          <input type="text" name="department" value={staffData.department} onChange={handleTextChange} placeholder="Department" required />
          <input type="text" name="role_type" value={staffData.role_type} onChange={handleTextChange} placeholder="Role Type" required />

          
          <select name="employment_type" value={staffData.employment_type} onChange={handleTextChange} required>
            <option value="">Employment Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
          </select>

          <input type="text" name="reporting_manager" value={staffData.reporting_manager} onChange={handleTextChange} placeholder="Reporting Manager" required />
          <select name="staff_status" value={staffData.staff_status} onChange={handleTextChange} required>
            <option value="">Staff Status</option>
            <option value="active">Active</option>
            <option value="leave">Leave</option>
            <option value="resigned">Resigned</option>
          </select>

          
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="aadhar_number" value={staffData.aadhar_number} onChange={handleNumberChange} placeholder="Aadhar Number" required />
          <input type="text" name="pan_number" value={staffData.pan_number} onChange={handleTextChange} placeholder="PAN Number" required />
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="bank_account_number" value={staffData.bank_account_number} onChange={handleNumberChange} placeholder="Bank Account Number" required />
          <input type="text" name="bank_name" value={staffData.bank_name} onChange={handleTextChange} placeholder="Bank Name" required />
          <input type="text" name="ifsc_code" value={staffData.ifsc_code} onChange={handleTextChange} placeholder="IFSC Code" required />

          
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="salary" value={staffData.salary} onChange={handleNumberChange} placeholder="Salary" required />

          
          <input type="text" name="highest_qualification" value={staffData.highest_qualification} onChange={handleTextChange} placeholder="Highest Qualification" required />
          <input type="text" name="specialization" value={staffData.specialization} onChange={handleTextChange} placeholder="Specialization" required />

          
          <select name="role" value={staffData.role} onChange={handleTextChange} required>
            <option value="">Role</option>
            <option value="staff">Staff</option>
            <option value="head">Head</option>
          </select>

          <button type="submit">Save Staff</button>
        </form>
      </div>
      <ErrorPopup 
      emessage={Emessage}
      onClose={()=>setEmessage("")}
      />
      <MessagePopup
      message={Message}
      onClose={()=>setMessage("")}
      />
    </div>
  );
}

export default AddStaff;