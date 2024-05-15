import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const Privaterout = () => {
    if(isLoggedin()){
        return <Outlet/> 
      }else{
        return <Navigate to='/login'/>
      }
    
}

export default Privaterout
