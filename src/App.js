import React,{Suspense} from 'react';
import "../src/static/fontawesome/css/all.min.css";
import { Routes, Route } from "react-router-dom";
import { useCallback } from "react";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { store } from "./State/store";
// import {getAuthAction} from './State/Action-creators';
import { loadUser } from "./State/Action-creators";
import RequireAuth from "./components/RequireAuth";
import { connect } from "react-redux";
import { Audio } from 'react-loader-spinner';
import CustomLoader from './components/CustomLoader';
import PrivateRoute from './components/PrivateRoute';
import { abort } from 'process';
// import ListForm from "./components/Organization/ListForm";
const ListForm=React.lazy(()=> import('./components/Organization/ListForm'));
// import ListAdmin from "./components/Admin/ListAdmin";
const ListAdmin=React.lazy(()=> import('./components/Admin/ListAdmin'));

// import ListDashboard from "./components/Home/ListDashboard";
const ListDashboard=React.lazy(()=> import('./components/Home/ListDashboard'));
// import ListDistributor from "./components/Distributor/ListDistributor";
const ListDistributor=React.lazy(()=> import('./components/Distributor/ListDistributor'));
// import ListDepartment from "./components/Dashboard/ListDepartment";
const ListDepartment=React.lazy(()=> import('./components/Dashboard/ListDepartment'));
// import ListCustomer from "./components/Customer/ListCustomer";
const ListCustomer=React.lazy(()=> import('./components/Customer/ListCustomer'));
// import ListUsers from "./components/Users/ListUsers";
const ListUsers=React.lazy(()=> import('./components/Users/ListUsers'));
// import LoginRegister from "./components/LoginRegister/LoginRegister";
const LoginRegister=React.lazy(()=> import('./components/LoginRegister/LoginRegister'));
// import CustomerHome from "./components/Customer/Customerss/CustomerHome";
const CustomerHome=React.lazy(()=> import('./components/Customer/Customerss/CustomerHome'));
// import CustomerDashboard from "./components/Customer/Customerss/CustomerDashboard";
const CustomerDashboard=React.lazy(()=> import('./components/Customer/Customerss/CustomerDashboard'));
// import CustomerUsers from "./components/Customer/Customerss/CustomerUsers";
const CustomerUsers=React.lazy(()=> import('./components/Customer/Customerss/CustomerUsers'));
// import CustomerDistributor from "./components/Customer/Customerss/CustomerDistributor";
const CustomerDistributor=React.lazy(()=> import('./components/Customer/Customerss/CustomerDistributor'));
// import CustomerCust from "./components/Customer/Customerss/CustomerCust";
const CustomerCust=React.lazy(()=> import('./components/Customer/Customerss/CustomerCust'));
// import Prdhome from './components/Prdhomepage/Prdhome';
const Prdhome=React.lazy(()=> import('./components/Prdhomepage/Prdhome'));
// import ListForm1 from './components/Organization1/ListForm1';
const ListForm1=React.lazy(()=> import('./components/Organization1/ListForm1'));
// import ListForm2 from './components/Organization2/ListForm2';
const ListForm2=React.lazy(()=> import('./components/Organization2/ListForm2'));
// import ListForm3 from './components/Organization3/ListForm3';
const ListForm3=React.lazy(()=> import('./components/Organization3/ListForm3'));
// import ListForm4 from './components/Organization4/ListForm4';
const ListForm4=React.lazy(()=> import('./components/Organization4/ListForm4'));
// import ListForm5 from './components/Organization5/ListForm5';
const ListForm5=React.lazy(()=> import('./components/Organization5/ListForm5'));
const Production=React.lazy(()=> import('./components/Prodadmin/Prdadminhome'));

// import Models from "./components/Dashboard/Models";
const Models=React.lazy(()=> import('./components/Dashboard/Models'));
// import Unauthorized from "./components/Unauthorize";
const Unauthorized=React.lazy(()=> import('./components/Unauthorize'));


// const fs = require('fs')
// import Layout from './components/Layout'
// import Public from './components/Public'
// import Login from './components/LoginRegister/Login'
// import Welcome from './components/Home/Welcome'
// import RequireAuth from './components/RequireAuth'
// import UsersList from './components/UsersList'
function App() {
  const [Auth, setisAuth] = useState([]);
  // // store.dispatch(loadUser());
  // // console.log(store.getState().auth.isAuthenticated);
  // useEffect(() => {
  //   setauth(store.getState().auth.isAuthenticated);
  //   if (auth != null) {
  //     Navigate("/home");
  //   } else {
  //     Navigate("/");
  //   }
  // }, []);
  // console.log("count",count)
  // let momCalling = useCallback((res) => console.log(res));
  // const [count, setCount] = useState("");

  // const handleClick = num => {
  //   const file_name=num+".txt"
  //   console.log("filename",file_name)
  // fetch(file_name)
  // .then(response => response.text())
  // .then(text => console.log(text))
  //   setCount(num);
  // };
  useEffect(() => {
    //   store.dispatch(getAuthAction());
    //     store.subscribe(() => {
    //       const state= store.getState();
    //       if (state.auth.status == "waiting") {
    //        setisAuth("Loading...");
    //       }
    //       if (state.auth.status == "received") {
    //       setisAuth(state.auth.data[0])
    //       // console.log("state.auth.data")
    //       // console.log(state.auth.data[0])
    //       }
    // const token = localStorage.getItem("token");
    // if (token) {
    //   Navigate("/home");
    // }
    // else {
    //   Navigate("/");
    // }
    let isMounted = true;
    const abortCont = new AbortController();
    isMounted &&
      store.dispatch(loadUser());
      store.subscribe(() => {
              const state= store.getState();
              if (state.auth.status == "waiting") {
               setisAuth("Loading...");
              }
              if (state.auth.status == "received") {
              setisAuth(state.auth.data)
              // console.log("state.auth.data")
              // console.log(state.auth.data[0])
              }
              return () => {
                abortCont.abort();
              };
            });
          }, []);
          console.log("AUTH IS USER",Auth)
  // export function Mom() {
  // yes mom
  // return <Child update={momCalling} />
  // }

  // export function Child(props)  {
  // let yesMom = useCallback(() => props.update('yes mom'));
  // return <button onClick={yesMom}>Click</button>;
  // }
  //   const[isAuth,setisAuth]=useState([])
  // useEffect(()=>{
  //     const abortCont=new AbortController();
  //   store.dispatch(getAuthAction());
  //     store.subscribe(() => {
  //       const state= store.getState();
  //       if (state.auth.status == "waiting") {
  //        setisAuth("Loading...");
  //       }
  //       if (state.auth.status == "received") {
  //       setisAuth(state.auth.data[0])
  //       // console.log("state.auth.data")
  //       // console.log(state.auth.data[0])
  //       }

  // });
  // return()=>{
  //   abortCont.abort();
  // }
  // },[])
  // console.log("isAuth")
  // console.log(isAuth.data)

  
  return (
    <Suspense fallback={
<CustomLoader/>
}>
    <Routes>
      
      {/*-------------------------------------------------- Login Route -------------------------------------------------------------  */}
      {/* <Route element={<RequireAuth />}> */}
      <Route
        path="/"
        element={
          <LoginRegister
          //  handleClick={handleClick}
          // count={count}
          />
        }
      />
      {/* </Route> */}
      {/*-------------------------------------------------- Home Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth/>}>
      {/* <Route element={<PrivateRoute />}> */}
      <Route path="/home" element={<ListDashboard />}/>
      </Route>
      {/*-------------------------------------------------- Distributor Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
      <Route path="/organization" element={<ListForm />} />
      </Route>
      {/*-------------------------------------------------- Dashboard Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
      <Route path="/department" element={<ListDepartment />} />
      </Route>

      {/*-------------------------------------------------- Admin Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
      <Route path="/admin" element={<ListAdmin />} />
      </Route>

      {/*-------------------------------------------------- Customer Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
        <Route path="/distributor" element={<ListDistributor />} />
      </Route>

      {/*-------------------------------------------------- Customer Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
        <Route path="/customer" element={<ListCustomer />} />
      </Route>

      {/*-------------------------------------------------- User Route -------------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
        <Route path="/user" element={<ListUsers />} />
      </Route>

      {/*------------------------ User Pages Inside Route --------------------  */}
      <Route element={<RequireAuth />}>
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/department" element={<CustomerDashboard />} />
        <Route path="/customer/distributor" element={<CustomerDistributor />} />
        <Route path="/customer/customer" element={<CustomerCust />} />
        <Route path="/customer/user" element={<CustomerUsers />} />
      </Route>

      {/*-------------------------------------------- User Pages Inside Route --------------------------------------------------------  */}
      <Route element={<RequireAuth />}>
        <Route
          path="/department/:"
          element={<Navigate to="/department/:Did" replace />}
        />
        <Route path="/department/:Did" element={<Models/>} />
        </Route>
        <Route path="*" element={<Unauthorized />} />
      
     {/* -------------------------------------------------Production Route----------------------------------------  */}
      <Route element={<RequireAuth />}>
      <Route path="/production"  element={<Production/> }/>
      </Route>

      <Route element={<RequireAuth />}>
      <Route path="/prdhome"  element={ <Prdhome/>
       }  />
      </Route>
    {/*-------------------------------------------------- Home Route -------------------------------------------------------------  */}
    <Route element={<RequireAuth />}>
    <Route path="/Rej" element={
                  <ListForm1/>       
             }  
                />
    </Route>
    {/*-------------------------------------------------- Distributor Route -------------------------------------------------------------  */}
    <Route element={<RequireAuth />}>
      <Route path="/Adj" element={
                    <ListForm2/>       
              }  
                  />
                  <Route path="/Prd" element={
                    <ListForm3/>       
              }  
                  />
      </Route>
    <Route element={<RequireAuth />}>
    <Route path="/dataentry" element={
    <ListForm4 
        /> } />
     </Route>
    <Route element={<RequireAuth />}>
        <Route path="/Edataentry" element={
    <ListForm5 
        /> } />
      </Route>
     
    </Routes>
    </Suspense>
  );

  {
    /*	
 <Routes>
<Route path="/" element={<Layout />}>
  {/* public routes
  <Route index element={<Public />} />
  <Route path="login" element={<Login />} />

  {/* protected routes 
  <Route element={<RequireAuth />}>
    <Route path="welcome" element={<Welcome />} />
    <Route path="userslist" element={<UsersList />} />
  </Route>

</Route>
</Routes> */
  }
}
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });

// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(actionCreators, dispatch),
// });

// export default connect(mapStateToProps)(App);
// export default ListDashboard
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error,
// });

// export default connect(mapStateToProps)(App);
export default App;
