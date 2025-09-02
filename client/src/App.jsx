import React ,{useEffect}from 'react'
import { lazy } from 'react'
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';

import Protectedroutes from './components/protection/protectionRoute';

const Loginpage=lazy(()=>import("./pages/Others/Loginpages"));
const CreatePassword=lazy(()=>import("./pages/Others/CreatePassword"));
const AdminHome=lazy(()=>import("./pages/admin/AdminHome"));
const HeadHome=lazy(()=>import("./pages/head/HeadHome"));
const StaffHome=lazy(()=>import("./pages/staff/StaffHome"));
const StudentHome=lazy(()=>import("./pages/student/StudentHome"));
const AccountantHome=lazy(()=>import("./pages/accountant/AccountantHome"));



function App() {

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Loginpage/>}/>
        <Route path='/create-password' element={<CreatePassword/>}/>

        <Route path='/admin-home' element={
          <Protectedroutes>
              < AdminHome/>
          </Protectedroutes>
          }/>

        <Route path='/head-home' element={
          <Protectedroutes>
            <HeadHome/>
          </Protectedroutes>
          }/>

          <Route path='/staff-home' element={
          <Protectedroutes>
            <StaffHome/>
          </Protectedroutes>
          }/>

          <Route path='/accountant-home' element={
          <Protectedroutes>
            <AccountantHome/>
          </Protectedroutes>
          }/>

          <Route path='/student-home' element={
          <Protectedroutes>
            <StudentHome/>
          </Protectedroutes>
          }/>

          
        


        <Route path="*" element={<Navigate to="/login"/>} />
     
      </Routes>
    </Router>
  )
}

export default App
