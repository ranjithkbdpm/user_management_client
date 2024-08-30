import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from 'react';
import Loading from './components/Loading'


const Login = lazy(()=>import('./screens/Login'));
const Dashboard = lazy(()=>import('./screens/Dashboard'));
const SignUp = lazy(()=>import('./screens/SignUp'));

const Routing = () => {
  return (
    <BrowserRouter>
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>                
            </Routes>
        </Suspense>
  </BrowserRouter>     
  )
}

export default Routing