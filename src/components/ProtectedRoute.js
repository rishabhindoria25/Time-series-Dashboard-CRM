import React, { useContext } from 'react'
import { Route} from 'react-router-dom'
import userAuthenticated from './LoginRegister'
import AuthProvider from '../Context/AuthProvider';
import AuthContext from '../Context/AuthProvider';
import LoginRegister from './LoginRegister';
// import { Navigate } from 'react-router-dom';
import AuthService from './Services/AuthService';
import { Navigate,useLocation } from 'react-router-dom';
import { store } from '../State/store';
import {getAuthAction} from '../State/Action-creators';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
// import { useEffect } from 'react';
// import { useState } from 'react';
// function ProtectedRoute ({component:Component,...restOfProps})  {
  // function ProtectedRoute({auth,children})  {
    const ProtectedRoute=({auth,children})=>{
  // store.dispatch(getAuthAction());
  // const Protect=useSelector(state=>state.auth)
//   const [Auth,setAuth]=useState([])
//   console.log("Auth")
// console.log(Auth)
//   useEffect(()=>{
  console.log("auth")
  console.log(auth)
//    const abortCont=new AbortController();
//    console.log("getAuthAction")
//    store.dispatch(getAuthAction());
  
//    store.subscribe(() => {
//      const state= store.getState();
//      if (state.auth.status == "waiting") {
//       setAuth("Loading...");
//      }
//      if (state.auth.status == "received") {
//        console.log("state.data:::::::::::::::")
//        console.log("state.data")
//       console.log(state.auth.data[0].data)
//       setAuth(state.auth.data[0].data)
//      }
//      return()=>{
//        abortCont.abort();
//      }
//    }); 
//   },[])
    // const isauth =auth
    // const loginStatus=useContext(AuthContext)
    // console.log("---------------"+JSON.stringify(isauth))
  // return (
    if (!auth) {
      return <Navigate to="/" replace />;
    }
    return children ? children : <Outlet />;
  //   <Route
  //       {...restOfProps}
  //      render={(props)=>
  // isauth?<Component{...props}/>:<Navigate to="/"/>
 
    //  }
    // />
  // )
// }
}

export default ProtectedRoute
