import React, { lazy, useState ,useEffect} from 'react'
import axios from "axios";
import "./css/adminstaffview.css";


function AdminStaffView({ setEmessage }) {
  const [CardData, setCardData] = useState([]);
  const Token = localStorage.getItem("Token");
  const [selectedStaff,setSelectedStaff]=useState("");

  const GetStaff = async () => {
    try {
        if(selectedStaff) return;
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getcardstaff`,
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
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
     console.log(error)
    }
  };

  const GetStaffDetails = async () => {
    try {
        if(!selectedStaff) return;

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/admin/getstaffdetails`,
        {username:selectedStaff},
        {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'application/json',
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
      console.log(error)
    }
  };

  useEffect(() => {
    GetStaff();
  }, []);

  useEffect(()=>{
    GetStaff();
    GetStaffDetails()
  },[selectedStaff]);
  

  return (
    <div className="admin-staff-view-main">
      <h2>Staff View</h2>

      {CardData.length === 0 ? (
        <p>No staff data found.</p>
         ) : (
            selectedStaff?(

                <>
                    <button onClick={()=>{setSelectedStaff("")}}>Back</button>

                
                </>

            ):(
                <>
                <div className="staff-cards">
                    {CardData.map((staff) => (
                    <div key={staff.username} className="staff-card" onClick={()=>{setSelectedStaff(staff.username)}}>
                        <div className="staffcard-left">
                            <img
                                src={`${import.meta.env.VITE_BACKEND_URL}${staff.photo_url}`}
                                alt={`${staff.first_name} ${staff.last_name}`}
                            />
                        </div>
                    <div className="staff-card-right">
                        <h3>{staff.prefix} {staff.first_name} {staff.last_name}</h3>
                        <p>Department: {staff.department}</p>
                        <p>Gender: {staff.gender}</p>
                        <p>Designation: {staff.designation}</p>
                        <p>Status: {staff.staff_status}</p>
                    </div>
                    </div>
                    ))}
                </div>
                
                </>

            )
        
      )}
    </div>
  );
}

export default AdminStaffView;