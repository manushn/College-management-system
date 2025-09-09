import React, { useState, useEffect, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import "./css/admindash.css";

const AdminMainDash = lazy(() => import("../admin-main/AdminMainDash.jsx"));
const AdminStaff = lazy(() => import("../admin-staff/AdminStaff.jsx"));
const AdminStudent = lazy(() => import("../admin-student/AdminStudent.jsx"));
const AdminAccounts = lazy(() => import("../admin-account/AdminAccounts.jsx"));
const AdminProgress = lazy(() => import("../admin-progress/AdminProgress.jsx"));
const AdminClasses = lazy(() => import("../admin-class/AdminClasses.jsx"));
const AdminAttendence = lazy(() => import("../admin-attendence/AdminAttendence.jsx"));

function Admindash() {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('dashboard');
  const [history, setHistory] = useState([]); 
  const [issidebarOpen, setissidebarOpen] = useState(window.innerWidth >= 768);
  const [width, setWidth] = useState(window.innerWidth);

  
useEffect(() => {
    const token = sessionStorage.getItem('Token');
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [navigate,activeTab]);

 
useEffect(() => {
    const Resize = () => {
      setWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setissidebarOpen(true);
      } else {
        setissidebarOpen(false);
      }
    };

    window.addEventListener("resize", Resize);
    return () => window.removeEventListener("resize", Resize);
  }, []);


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


  const changetab = (tabName) => {
    setHistory(prev => [...prev, activeTab]);
    setActiveTab(tabName);
    if (width < 768) {
      setissidebarOpen(false);
    }
    window.history.pushState({}, ""); 
  };

 
  const rendercon = () => {
    switch (activeTab) {
      case 'dashboard':{
        return <AdminMainDash />};
      case 'managestaffs': {
        return <AdminStaff />};
      case 'managestudents': {
        return <AdminStudent />};
      case 'accounts': 
      {return <AdminAccounts />};
      case 'attendence':{
        return <AdminAttendence />
      } ;
      case 'progress':{
        return <AdminProgress />};
      case 'maintainclasses': {
        return <AdminClasses />};
      default: {
        return <AdminMainDash />};
    }
  };

  return (
    <div className="admin-main">
      <div className="adminleft">
        <button
          className="sidebar-toggle"
          onClick={() => setissidebarOpen(!issidebarOpen)}
        >
          ☰
        </button>

        <div className={`adminslider ${issidebarOpen ? 'open' : 'closed'}`}>
          <div className="slider">
            <ul>
              <li onClick={() => changetab('dashboard')}><img src="adminimg/home.png" /><span>Dashboard</span></li>
              <li onClick={() => changetab('managestaffs')}><img src="adminimg/teamwork.png" /><span>Manage Staffs</span></li>
              <li onClick={() => changetab('managestudents')}><img src="adminimg/people.png" /><span>Manage Students</span></li>
              <li onClick={() => changetab('accounts')}><img src="adminimg/accounting.png" /><span>Accounts</span></li>
              <li onClick={() => changetab('attendence')}><img src="adminimg/attendance.png" /><span>Attendance</span></li>
              <li onClick={() => changetab('progress')}><img src="adminimg/rising.png" /><span>Progress</span></li>
              <li onClick={() => changetab('maintainclasses')}><img src="adminimg/calendar.png" /><span>Administration</span></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="adminright">
        {rendercon()}
      </div>
    </div>
  );
}

export default Admindash;