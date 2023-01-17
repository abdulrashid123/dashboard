import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'
import {isMobile} from 'react-device-detect';


function RequireAuth({children}) {
    const auth = useAuth()

  if(isMobile){
    
    return <h1>desktop Browser allowed</h1> 
  }
  
  return children
}

export default RequireAuth