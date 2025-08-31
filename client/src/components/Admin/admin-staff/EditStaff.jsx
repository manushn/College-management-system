import React, { useEffect, useState } from "react";
import axios from "axios";
import path from "path";

import "./css/addstaff.css";

import defaultImg from "../../../assets/default-user.png";

function EditStaff({ selectedStaff ,setIsEditing,setEmessage,setMessage}) {
  const Token = localStorage.getItem("Token");

  const emptyState = {
    prefix: "",
    first_name: "",
    last_name: "",
    staff_code:"",
    gender: "",
    date_of_birth: "",
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
    joining_date:"",
    role: "",
  };

  const [staffData, setStaffData] = useState(emptyState);
  const [preview, setPreview] = useState(defaultImg);
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    const noUppercase = ["date_of_birth", "email", "personal_email", "photo_url"];
    setStaffData((prev) => ({
      ...prev,
      [name]: noUppercase.includes(name) ? value : value.toUpperCase(),
    }));
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleemailChange = (e) => {
    const { name, value } = e.target;
    setStaffData((prev) => ({
      ...prev,
      [name]: value.toLowerCase(),
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value)) {
      setStaffData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setSelectedFile(null);
      setPreview(defaultImg);
      return;
    }

    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    const maxSize = 2 * 1024 * 1024;
    if (!allowed.includes(file.type)) {
      setEmessage("Only JPG/JPEG/PNG images are allowed.");
      return;
    }
    if (file.size > maxSize) {
      setEmessage("Image size must be less than 2 MB.");
      return;
    }

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const TestEmail = (email) => {
    if (!email) return false;
    const emailformate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailformate.test(email.trim());
  };

  const TestPhone = (phone) => {
    if (!phone) return false;
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const TestAadhar = (aadhar) => {
    if (!aadhar) return false;
    const aadharRegex = /^[0-9]{12}$/;
    return aadharRegex.test(aadhar);
  };

  const resetForm = () => {
    setStaffData(emptyState);
    setPreview(defaultImg);
    setSelectedFile(null);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    setEmessage("");
    setMessage("");

    if (!TestEmail(staffData.email)) {
      setEmessage("Enter a valid work email");
      return;
    }
    if (!TestEmail(staffData.personal_email)) {
      setEmessage("Enter a valid personal email");
      return;
    }
    if (!TestPhone(staffData.phone_number)) {
      setEmessage("Enter a valid phone number (10 digits)");
      return;
    }
    if (!TestPhone(staffData.emergency_contact_number)) {
      setEmessage("Enter a valid emergency contact number (10 digits)");
      return;
    }
    if(!TestAadhar(staffData.aadhar_number)){
      setEmessage("Enter a valid Aadhar Number")
      return;
    }


    try {
      setSubmitting(true);
      const formData = new FormData();

      if (selectedFile) {
        formData.append("photo", selectedFile);
      }

      Object.keys(staffData).forEach((key) => {
        if (staffData[key] !== undefined && staffData[key] !== null) {
          formData.append(key, staffData[key].toString());
        } else {
          formData.append(key, "");
        }
      });

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/updatestaff`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.emessage) {
        setEmessage(response.data.emessage);
      } else if (response.data.success) {
        setMessage("Staff updated");
        resetForm();
        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error in staff add:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const GetStaffDetails = async () => {
  try {
    if (!selectedStaff) return;

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/admin/getstaffdetails`,
      { username: selectedStaff },
      {
        headers: {
          Authorization: `Bearer ${Token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.emessage) {
      setEmessage(response.data.emessage);
    }
    if (response.data.Staffdata && Array.isArray(response.data.Staffdata)) {
      const staffInfo = response.data.Staffdata[0];
      
      
      if (staffInfo.date_of_birth) {
        const date = new Date(staffInfo.date_of_birth);
        staffInfo.date_of_birth = date.toISOString().split('T')[0];
      }
      if (staffInfo.joining_date) {
        const date = new Date(staffInfo.joining_date);
        staffInfo.joining_date = date.toISOString().split('T')[0];
      }
      
      
      if (staffInfo.salary) {
        staffInfo.salary = parseInt(staffInfo.salary).toString();
      }
      
      setStaffData(staffInfo);
      
      
      if (staffInfo.photo_url && staffInfo.photo_url !== '/uploads/default-user.png') {
        setPreview(`${import.meta.env.VITE_BACKEND_URL}${staffInfo.photo_url}`);
      }
    } else {
      setEmessage("Unable to fetch user data");
      setIsEditing(false);
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() => {
  if (selectedStaff) {
    GetStaffDetails();
  }
}, [selectedStaff]);

  return (
    <div className="admin-addstaff-main">
      <div className="admin-addstaff-head">
        <h3>Add Staff</h3>
        <button type="button" onClick={() => {setIsEditing(false);}}>
          Back
        </button>
      </div>

      <div className="admin-addstaff-form">
        <form onSubmit={handleupdate}>
          <div style={{ gridColumn: "1 / -1", display: "flex", gap: 12, alignItems: "center" }}>
            <div>
              <img
                src={
                    selectedFile
                    ? preview 
                    : staffData.photo_url
                    ? `${import.meta.env.VITE_BACKEND_URL}${staffData.photo_url}`
                    : defaultImg
                  }
                alt="preview"
                style={{
                width: 120,
                objectFit: "cover",
                borderRadius: 6,
                border: "1px solid #ddd"
                  }}
                />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <input
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleImageChange}
              />
              <small>Allowed: JPG, JPEG, PNG. Max 2 MB. If not provided default image will be used.</small>
            </div>
          </div>

          <select name="prefix" value={staffData.prefix} onChange={handleSelectChange} required>
            <option value="">Select Prefix</option>
            <option value="Mr">MR</option>
            <option value="Mrs">MRS</option>
            <option value="Miss">MISS</option>
          </select>
          <input type="text" name="first_name" value={staffData.first_name} onChange={handleTextChange} placeholder="First Name" required />
          <input type="text" name="last_name" value={staffData.last_name} onChange={handleTextChange} placeholder="Last Name" required />
          <select name="gender" value={staffData.gender} onChange={handleSelectChange} required>
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
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            placeholder="Date of Birth"
            required
          />
          <input type="text" name="staff_code" value={staffData.staff_code} onChange={handleTextChange} placeholder="Staff_code" maxLength={4} required />

          <input type="text" inputMode="numeric" pattern="[0-9]*" name="phone_number" value={staffData.phone_number} onChange={handleNumberChange} placeholder="Phone Number" required />
          <input type="email" name="email" value={staffData.email} onChange={handleemailChange} placeholder="Work Email" required />
          <input type="email" name="personal_email" value={staffData.personal_email} onChange={handleemailChange} placeholder="Personal Email" required />
          <textarea name="address" value={staffData.address} onChange={handleTextChange} placeholder="Address" required></textarea>
          <input type="text" name="city" value={staffData.city} onChange={handleTextChange} placeholder="City" required />
          <input type="text" name="state" value={staffData.state} onChange={handleTextChange} placeholder="State" required />
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="pincode" value={staffData.pincode} onChange={handleNumberChange} placeholder="Pincode" required />
          <input type="text" name="emergency_contact_name" value={staffData.emergency_contact_name} onChange={handleTextChange} placeholder="Emergency Contact Name" required />
          <input type="text" inputMode="numeric" pattern="[0-9]*" name="emergency_contact_number" value={staffData.emergency_contact_number} onChange={handleNumberChange} placeholder="Emergency Contact Number" required />
          <input type="text" name="designation" value={staffData.designation} onChange={handleTextChange} placeholder="Designation" required />
          <select name="department" value={staffData.department} onChange={handleSelectChange} required>
            <option value="">Department</option>
            <option value="ARTIFICIAL INTELLIGENCE AND DATA SCIENCE">ARTIFICIAL INTELLIGENCE AND DATA SCIENCE</option>
            <option value="COMPUTER SCIENCE ENGINEERING">COMPUTER SCIENCE ENGINEERING</option>
            <option value="INFORMATION TECHNOLOGY">INFORMATION TECHNOLOGY</option>
            <option value="MECHANICAL ENGINEERING">MECHANICAL ENGINEERING</option>
            <option value="ELECTRONICS AND COMMUNICATION ENGINEERING">ELECTRONICS AND COMMUNICATION ENGINEERING</option>
            <option value="ELECTRICAL AND ELECTRONICS ENGINEERING">ELECTRICAL AND ELECTRONICS ENGINEERING</option>
          </select>
          <input type="text" name="role_type" value={staffData.role_type} onChange={handleTextChange} placeholder="Role Type" required />
          <select name="employment_type" value={staffData.employment_type} onChange={handleSelectChange} required>
            <option value="">Employment Type</option>
            <option value="FullTime">Full Time</option>
            <option value="PartTime">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
          <input type="text" name="reporting_manager" value={staffData.reporting_manager} onChange={handleTextChange} placeholder="Reporting Manager" required />
          <select name="staff_status" value={staffData.staff_status} onChange={handleSelectChange} required>
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
          <input
            type={staffData.joining_date ? "date" : "text"}
            name="joining_date"
            value={staffData.joining_date}
            onChange={handleTextChange}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
            placeholder="JoiningDate"
            required
          />
          <select name="role" value={staffData.role} onChange={handleSelectChange} required>
            <option value="">Role</option>
            <option value="staff">Staff</option>
            <option value="head">Head</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" disabled={submitting}>
            {submitting ? "Saving..." : "Update Staff"}
          </button>
        </form>
      </div>

    </div>
  );
}

export default EditStaff;