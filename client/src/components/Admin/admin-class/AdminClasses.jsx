import React, { lazy, useState,useEffect } from 'react'

const DepManagement=lazy(()=>import("./AdminDepManage"));
const CourseManagement=lazy(()=>import("./AdminCourseManage"));
const EventManagement=lazy(()=>import("./AdminEventManagement"));
const TimetableManagement=lazy(()=>import("./TimeTableManage"));
const Managementdash=lazy(()=>import("./AdminManagement"));

import ErrorPopup from "../../../pages/Others/ErrorPopup"
import MessagePopup from "../../../pages/Others/MessagePopup"

function AdminClasses() {

  const [Departments,setDepartments]=useState([]);
  const [Courses,setCourses]=useState([]);
  const [Timetables,setTimetables]=useState([]);
  const [Events,setEvents]=useState([]);

  const [activeTab,setActiveTab]=useState('')
  const [history, setHistory] = useState([]); 

 const [Emessage,setEmessage]=useState("");
 const [Message,setMessage]=useState("");


  useEffect(() => {
      const handleBack = () => {
        setHistory(prev => {
          if (prev.length > 0) {
            const lastTab = prev[prev.length - 1];
            setActiveTab(lastTab);
            return prev.slice(0, -1);
          }
          return prev;
        });
      };
  
      window.addEventListener("popstate", handleBack);
      return () => window.removeEventListener("popstate", handleBack);
    }, []);

    useEffect(()=>{
        console.log(activeTab)
    },[activeTab])
  
    const rendercon= ()=>{
      switch(activeTab){
        case 'dashboard':{
          return <Managementdash 
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        };
        case 'managedepartment':{
          return <DepManagement 
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        };
        case 'managecourses':{
          return <CourseManagement  
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        };
        case 'managetimetable':{
          return <TimetableManagement  
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        };
        case 'manageevents':{
          return <EventManagement  
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        }
        default:{
          return <Managementdash  
          setActiveTab={setActiveTab}
          setEmessage={setEmessage}
          setMessage={setMessage}
          />
        }
      }
    };



  return (
    <>
      {rendercon()}
      <ErrorPopup emessage={Emessage} onClose={() => setEmessage("")} />
      <MessagePopup message={Message} onClose={() => setMessage("")} />
    </>
  )
}

export default AdminClasses
