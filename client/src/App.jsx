import React ,{useEffect}from 'react'
import { lazy } from 'react'
import { BrowserRouter as Router, Routes,Route, Navigate } from 'react-router-dom';

import Protectedroutes from './components/protection/protectionRoute';

const Loginpage=lazy(()=>import("./pages/Others/Loginpages"));
const CreatePassword=lazy(()=>import("./pages/Others/CreatePassword"));
const AdminHome=lazy(()=>import("./pages/admin/AdminHome"));





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
        
        <Route path="*" element={<Navigate to="/login"/>} />
     
      </Routes>
    </Router>
  )
}

export default App
