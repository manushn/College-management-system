import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/adminstaffview.css";
import EditStaff from "./EditStaff"; 
function AdminStaffView({ setEmessage }) {
  const [CardData, setCardData] = useState([]);
  const [Staffdetails, setStaffdetails] = useState([]);
  const Token = localStorage.getItem("Token");
  const [selectedStaff, setSelectedStaff] = useState("");
  const [isEditing, setIsEditing] = useState(false); 

  const GetStaff = async () => {
    try {
      if (selectedStaff) return;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getcardstaff`,
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
        setCardData(response.data.Staffdata);
      } else {
        setCardData([]);
      }
    } catch (error) {
      console.log(error);
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
        setStaffdetails(response.data.Staffdata);
      } else {
        setStaffdetails([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetStaff();
  }, []);

  useEffect(() => {
    GetStaff();
    GetStaffDetails();
  }, [selectedStaff]);

  return (
    <div className="admin-staff-view-main">
      {CardData.length === 0 ? (
        <>
          <h2>Staff View</h2>
          <p>No staff data found.</p>
        </>
      ) : selectedStaff ? (
        isEditing ? (
          <EditStaff
            selectedStaff={selectedStaff}
            setIsEditing={setIsEditing}
            setEmessage={setEmessage}
            setMessage={() => {}}
            refreshStaffDetails={GetStaffDetails}
          />
        ) : Staffdetails.length > 0 ? (
          <div className="staff-details-main">
            <div className="staff-details-head">
              <h2>Staff View</h2>
              <button
                type="button"
                onClick={() => {
                          console.log('Back clicked');
                          setSelectedStaff("");
                          
                        }}
                >Back</button>
            </div>
            <div className="staff-details-body">
              <div className="staff-details-body-con">
                <div className="staff-details-body-con-img">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${Staffdetails[0].photo_url}`}
                    alt="Staff Photo"
                  />
                </div>

                <p>
                  <b>Name:</b> {Staffdetails[0].prefix}.{" "}
                  {Staffdetails[0].first_name} {Staffdetails[0].last_name}
                </p>
                <p>
                  <b>Department:</b> {Staffdetails[0].department}
                </p>
                <p>
                  <b>Designation:</b> {Staffdetails[0].designation}
                </p>
                <p>
                  <b>Gender:</b> {Staffdetails[0].gender}
                </p>
                <p>
                  <b>DOB:</b> {Staffdetails[0].date_of_birth?.split("T")[0]}
                </p>
                <p>
                  <b>Phone Number:</b> {Staffdetails[0].phone_number}
                </p>
                <p>
                  <b>Work Email:</b> {Staffdetails[0].email}
                </p>
                <p>
                  <b>Personal Email:</b> {Staffdetails[0].personal_email}
                </p>
                <p>
                  <b>Highest Qualification:</b>{" "}
                  {Staffdetails[0].highest_qualification}
                </p>
                <p>
                  <b>Specialization:</b>
                  {Staffdetails[0].specialization}
                </p>
                <p>
                  <b>Employment Type:</b> {Staffdetails[0].employment_type}
                </p>
                <p>
                  <b>Reporting Staff:</b> {Staffdetails[0].reporting_manager}
                </p>
                <br></br>
                <p>
                  <b>Emergency Contacter Name:</b>{" "}
                  {Staffdetails[0].emergency_contact_name}
                </p>
                <p>
                  <b>Emergency Contacter Number:</b>{" "}
                  {Staffdetails[0].emergency_contact_number}
                </p>
                <p>
                  <b>Address:</b> {Staffdetails[0].address}
                </p>
                <p>
                  <b>City:</b> {Staffdetails[0].city}
                </p>
                <p>
                  <b>State:</b> {Staffdetails[0].state}
                </p>
                <p>
                  <b>Pincode:</b> {Staffdetails[0].pincode}
                </p>
                <br />

                <p>
                  <b>Aadhar Number:</b>
                  {Staffdetails[0].aadhar_number}
                </p>
                <p>
                  <b>Pan Number:</b>
                  {Staffdetails[0].pan_number}
                </p>
                <p>
                  <b>Bank Account Number:</b>{" "}
                  {Staffdetails[0].bank_account_number}
                </p>
                <p>
                  <b>Bank Name:</b> {Staffdetails[0].bank_name}
                </p>
                <p>
                  <b>IFSC Code:</b> {Staffdetails[0].ifsc_code}
                </p>
                <br />
                <p>
                  <b>Access Level:</b> {Staffdetails[0].role}
                </p>
                <p>
                  <b>Employee Status:</b>
                  {Staffdetails[0].staff_status}
                </p>

                <div className="staff-details-body-con-btn">
                  <button onClick={() => setIsEditing(true)}>Edit</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading staff details...</p>
        )
      ) : (
        <div className="staff-cards">
          {CardData.map((staff) => (
            <div
              key={staff.username}
              className="staff-card"
              onClick={() => {
                setSelectedStaff(staff.username);
              }}
            >
              <div className="staffcard-left">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}${staff.photo_url}`}
                  alt={`${staff.first_name} ${staff.last_name}`}
                />
              </div>
              <div className="staff-card-right">
                <h3>
                  {staff.prefix} {staff.first_name} {staff.last_name}
                </h3>
                <p>Department: {staff.department}</p>
                <p>Gender: {staff.gender}</p>
                <p>Designation: {staff.designation}</p>
                <p>Status: {staff.staff_status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminStaffView;