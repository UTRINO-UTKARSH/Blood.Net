import React from 'react'
import Dashboard from './Dashboard'
import { Route,Routes } from 'react-router-dom'
import Patient from './Patient'
import DonateBlood from './DonateBlood'
import Blood_req from './Blood_req'
import List from './List'
const PatientRoutes = () => {
  return (
        <Routes>
            <Route path="/" element={<Patient />}>
              <Route index element={<Dashboard/>} />
              <Route path='request_blood' element={<Blood_req/>} />
              <Route path='blood_donate' element={<DonateBlood/>} />
              <Route path='request_list' element={<List/>} />
            </Route> 
            
        </Routes>

  )
}

export default PatientRoutes