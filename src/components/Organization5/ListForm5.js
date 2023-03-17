import React,{ useState ,useEffect, Fragment} from 'react';
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useRef} from 'react';
import 'antd/dist/antd.css'; 
import ListformEditableRow5 from './ListformEditableRow5';
import Listformtable5 from './Listformtable5';
import Listformtable52 from './Listformtable52';
import Listformtable53 from './Listformtable53';
import ListformEditableRow53 from './ListformEditableRow53';

import ListformEditableRow52 from './ListformEditableRow52';
import Dialog from '../Prdhomepage/Dialog';
import Success from '../Organization4/Success';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";

function ListForm5() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const [showResults, setShowResults] = useState(false)
  const onClickdrop = () => {
    setShowResults(!showResults)
  }
  const [ShowForm, setShowForm ] = useState(false);
  const ShowForms= () => {
    setShowForm(!ShowForm);
  }
  const [showResults1, setShowResults1] = useState(true)
  const onClickdrops = () => {
    setShowResults1(!showResults1)
  }
  const [valueOrg,setvalueOrg]=useState([])
  const [Time,setTime]=useState([])
  const [ColumnOrg,setColumnOrg]=useState([])
  const [AdjState,setAdjState]=useState([]);
  const [RejState,setRejState]=useState([]);
  const [PrdState,setPrdState]=useState([]);
  const [EntryTime,setEntryTime]=useState([])
  const [part,setpart]=useState([])
  const [ColumnvalueOrg,setColumnvalueOrg]=useState([])
const [valuestoredRej,setvaluestoredRej]=useState([])
const [valuestoredAdj,setvaluestoredAdj]=useState([])
const [valuestoredPrd,setvaluestoredPrd]=useState([])
const [Arr,setArr]=useState([])
useEffect(()=>{
  fetch('http://localhost:8080/editformvalue',{
    method:'GET',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'applications/json',
    }
  }).then(response => response.json())
  .then(response=>setvalueOrg(response))
  .catch(error =>console.log(error))
 
},[])
useEffect(()=>{
  fetch('http://localhost:8080/Rejvalue',{
    method:'GET',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'applications/json',
    }
  }).then(response => response.json())
  .then(response=>setvaluestoredRej(response))
  fetch('http://localhost:8080/Adjvalue',{
    method:'GET',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'applications/json',
    }
  }).then(response => response.json())
  .then(response=>setvaluestoredAdj(response))
  .catch(error =>console.log(error))
  fetch('http://localhost:8080/Prdvalue',{
    method:'GET',
    headers:{
      'Access-Control-Allow-Origin': '*',
      'Content-Type':'applications/json',
    }
  }).then(response => response.json())
  .then(response=>setvaluestoredPrd(response))
  .catch(error =>console.log(error))

},[])
const handlechangeEntryTime = (e) =>{ 
  e.preventDefault();
  setEntryTime(e.target.value)
    }
 
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/editformcolvalue',{
      method:'GET',
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setColumnOrg(response))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])


console.log("time",EntryTime)
// useEffect(()=>{
//   fetch('http://localhost:8080/Entrytimevalue', {
//     method: 'POST',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({EntryTime})
//   })
//   .then((response)=>response.json())
// .then(response=>setTime(response))
// .catch(error =>console.log(error))
// },[EntryTime])
// useEffect(()=>{
//   const col=String(ColumnOrg).split(",").join(",")

// const url='http://localhost:8080/Entrytimecolvalue'
// fetch(url,
// {
//   method:'POST',
// headers:{
// 'Access-Control-Allow-Origin': '*',
// 'Accept': 'application/json',
// 'Content-Type': 'application/json'
// },body:JSON.stringify({EntryTime,col})
// }).then(response => response.json())
// .then(response=>setColumnvalueOrg(response))
// .catch(error =>console.log(error))
// },[ColumnOrg])
// useEffect(()=>{

// fetch('http://localhost:8080/part',{
//     method:'POST',
//     headers:{
//       'Access-Control-Allow-Origin': '*',
//       'Content-Type':'applications/json',
//     },body:JSON.stringify({EntryTime})
//   }).then(response => response.json())
//   .then(response=>setpart(response))
//   .catch(error =>console.log(error))
// },[EntryTime])
// const Rejvalue=Arr[0].map((ele)=>(ele[1]));
// console.log("Rejvalue",Rejvalue)
// const RejQty=Arr[0].map(ele=>(ele[2]));
// console.log("RejQty",RejQty)
// useEffect(()=>{
//   const abortCont=new AbortController();
//   const url='http://localhost:8080/Entrytimecolvalue'
//   fetch(url,
//   {
//     method:'POST',
//  headers:{
//   'Access-Control-Allow-Origin': '*',
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
//  },body:JSON.stringify({EntryTime,col})
// }).then(response => response.json())
// .then(response=>setColumnvalueOrg(response))
// .catch(error =>console.log(error))
 
// return()=>{
//   abortCont.abort();
// }
// },[Time,AdjState,RejState,PrdState])
const handleclick=(event)=>{
  event.preventDefault();
  fetch('http://localhost:8080/part', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({EntryTime})
  })
  .then((response)=>response.json())
.then(response=>setpart(response))
.catch(error =>console.log(error))
  fetch('http://localhost:8080/Entrytimevalue', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({EntryTime})
  })
  .then((response)=>response.json())
.then(response=>setTime(response))
.catch(error =>console.log(error))
const col=String(ColumnOrg).split(",").join(",")

const url='http://localhost:8080/Entrytimecolvalue'
fetch(url,
{
  method:'POST',
headers:{
'Access-Control-Allow-Origin': '*',
'Accept': 'application/json',
'Content-Type': 'application/json'
},body:JSON.stringify({EntryTime,col})
}).then(response => response.json())
.then(response=>setColumnvalueOrg(response))
.catch(error =>console.log(error))
valuestoredRej && valuestoredRej.map(ar=>(
  NEWTAB.get(ar[1])?
    ar.splice(2,0,NEWTAB.get(ar[1]))
  :ar.splice(2,0,(0))
   ))
valuestoredAdj && valuestoredAdj.map(art=>(
NEWTAB.get(art[1])?
art.splice(2,0,NEWTAB.get(art[1]))
:art.splice(2,0,(0))
))
valuestoredPrd && valuestoredPrd.map(arti=>(
NEWTAB.get(arti[1])?
arti.splice(2,0,NEWTAB.get(arti[1]))
:arti.splice(2,0,(0))
))
console.log("too easy",valuestoredRej)
console.log("too easy",valuestoredAdj)
console.log("too easy",valuestoredPrd)

setAdjState(valuestoredAdj)
setRejState(valuestoredRej)
setPrdState(valuestoredPrd)
console.log("easy",RejState)
console.log("easy",AdjState)
console.log("easy",PrdState)

Arr.splice(0,0,RejState)
Arr.splice(1,0,AdjState)
Arr.splice(2,2,PrdState)
//   const col=String(ColumnOrg).split(",").join(",")
// // // useEffect(()=>{
// //   // const abortCont=new AbortController();
//   const url='http://localhost:8080/Entrytimecolvalue'
//   fetch(url,
//   {
//     method:'POST',
//  headers:{
//   'Access-Control-Allow-Origin': '*',
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//  },body:JSON.stringify({EntryTime,col})
// }).then(response => response.json())
// .then(response=>setColumnvalueOrg(response))
// .catch(error =>console.log(error))

//   console.log("entrytime",JSON.stringify({EntryTime}))
//   fetch('http://localhost:8080/Entrytimevalue', {
//     method: 'POST',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({EntryTime})
//   })
//   .then(()=>console.log("success"))
// .then(response => response.json())
// .then(response=>setTime(response))
// .catch(error =>console.log(error))


  ShowForms()
}

const buildMap = (keys, values) => {
  const map = new Map();
  for(let i = 0; i < keys.length; i++){
    map.set(keys[i], values[i]);
  };
  return map;
};
const NEWTAB=buildMap(ColumnOrg,ColumnvalueOrg)
let Entry = valueOrg.length > 0
&& valueOrg.map((item, i) => {
return (
  <option key={i} value={item[item.length - 1]}>{item[item.length - 1]}</option>
)
})

let dateString='';
let dateString1='';

// useEffect(()=>{
  
// valuestoredRej && valuestoredRej.map(ar=>(
//       NEWTAB.get(ar[1])?
//         ar.splice(2,0,(NEWTAB.get(ar[1])))
//       :ar.splice(2,0,(0))
//        ))
// valuestoredAdj && valuestoredAdj.map(art=>(
//     NEWTAB.get(art[1])?
//   art.splice(2,0,(NEWTAB.get(art[1])))
// :art.splice(2,0,(0))
//    ))
//    valuestoredPrd && valuestoredPrd.map(arti=>(
//     NEWTAB.get(arti[1])?
//     arti.splice(2,0,(NEWTAB.get(arti[1])))
//   :arti.splice(2,0,(0))
//    ))
   
//     },[NEWTAB,valuestoredRej,valuestoredPrd,valuestoredAdj])
   
//    useEffect(()=>{
//     var s=NEWTAB.get("Starttime")
//     var myDate = new Date(String(s).replace(/^0+/, ''));
//     Stime= myDate.toLocaleString()
//     var d=NEWTAB.get("Endtime")
// var myDate1 = new Date(d);
//  Etime=myDate1.toLocaleString()
// console.log(myDate)
//    },[valueOrg])
let S=NEWTAB.get("Starttime")
let E=NEWTAB.get("Endtime")

var newDate = new Date();
var newDate1 = new Date();

newDate.setTime(S/1000000);
newDate1.setTime(E/1000000);

dateString = newDate.toUTCString();
dateString1 = newDate1.toUTCString();

  // useEffect(()=>{
  //   setAdjState(valuestoredAdj)
  //   setRejState(valuestoredRej)
  //   setPrdState(valuestoredPrd)
   

  // },[valuestoredRej,valuestoredPrd,valuestoredAdj,AdjState,RejState,PrdState])
  
function collapseSidebar(){
  const Body =document.getElementById('body');
  Body.classList.toggle('sidebar-expand');

}
window.onclick = function (event) {
  openCloseDropdown(event)
}

function closeAllDropdown() {
  var dropdowns = document.getElementsByClassName('dropdown-expand')
  for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove('dropdown-expand')
  }
}

function openCloseDropdown(event) {
  if (!event.target.matches('.dropdown-toggle')) {
      closeAllDropdown()
  } else {
      var toggle = event.target.dataset.toggle
      var content = document.getElementById(toggle)
      if (content.classList.contains('dropdown-expand')) {
          closeAllDropdown()
      } else {
          closeAllDropdown()
          content.classList.add('dropdown-expand')
      }
  }
}
console.log("newtab",NEWTAB)
console.log("Arr",Arr)

const [inputFields, setInputFields] = useState({})

const handleChange = (e,index) => {
  // console.log("index",index)
  // console.log("hello",Arr[0][index])
  // const newindex=Arr[0].findIndex((ind)=>ind===index)
  // console.log("newindex",Arr[0])
  // console.log('val', e?.target?.value);
 const input= Arr[0][index].splice(2, 1,parseInt(e?.target?.value))
  const value=input?input:Arr[0]
  // const data = { ...inputFields };
//  const new_value= Arr[0].find(console.log(Arr[0][index][2]===e?.target?.value))
// const new_value=Arr[0].find(v =>v[index] === Arr[0][index])[index][2] = e?.target?.value;
  // === e?.target?.value )
  // const new_value=(Arr[0][index][2]= e?.target?.value)
  // console.log("new_value",new_value)
  // console.log(Arr[0])
  // data[Arr[0][index][2]] = e?.target?.value;
  setInputFields(value);
};
console.log(inputFields)
const [inputFieldsA, setInputFieldsA] = useState({})
const [inputFieldsP, setInputFieldsP] = useState({})
const handleChangeA = (e,index) => {
  // console.log("index",index)
  // const data = { ...inputFieldsA };

  const input=Arr[1][index].splice(2, 1,parseInt(e?.target?.value))
  const value=input?input:Arr[0]
  
  // console.log('val', e?.target?.value);
  // data[e?.target?.name] = e?.target?.value;
  setInputFieldsA(value);
  

};
console.log("check",inputFieldsA)
const handleChangeP = (e,index) => {
  // console.log("index",index)
 const input=Arr[2][index].splice(2, 1,parseInt(e?.target?.value))
 const value=input?input:Arr[0]

  // console.log('val', e?.target?.value);
  // const data = { ...inputFieldsP };
  // data[e?.target?.name] = e?.target?.value;

  
  setInputFieldsP(value);
};

console.log("inputfileds",inputFields)
console.log("inputfiledsA",inputFieldsA)
console.log("inputfiledsP",inputFieldsP)


const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  nameProduct: ""
});
const [dialog1, setDialog1] = useState({
  message: "",
  isLoading: false,
  nameProduct: ""
});
const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    nameProduct
  });
};
const handleDialog1 = (message, isLoading, nameProduct) => {
  setDialog1({
    message,
    isLoading,
    nameProduct
  });
};

const handleDelete=(event)=>{
  event.preventDefault();
  handleDialog("Are you sure you want to delete?", true);
  console.log("state",Time)
}
const areUSureDelete = (choose) => {
  if (choose) {
    console.log("state",Time)
    var time = ((new Date(Time[0])).getTime() ) *1000000;
    console.log("time",time)
fetch('http://localhost:8080/editentrydelete', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({time})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))
  axios.post('apiurlq=Delete from NEWTAB_1 where time ='+time,
  ).then(res => console.log(res))
  setShowForm(!ShowForm);
  window.location.reload();
    handleDialog("", false);
  
  } else {
    handleDialog("", false);
  }
};

// const handleDelete=(event)=>{
//   event.preventDefault();
//   // const time=
  
//   var time = 
// ((new Date(Time[0])).getTime() ) *1000000;
// console.log("Time",Time)
//   console.log("time",time)
//   // axios.post('apiurlq=Delete from NEWTAB_1 where time ='+time,
//   // ).then(res => console.log(res))
//   setShowForm(!ShowForm);
//   window.location.reload();
// }

// useEffect(()=>{
 
// },[AdjState,RejState,PrdState])
// console.log("NEWTAB",NEWTAB)

const handleEditFormSubmit=(event)=>{
          event.preventDefault();
          const Keys=[]
          console.log("input",inputFields)
          console.log("input",inputFieldsA)
          console.log("input",inputFieldsP)
const val=[]
 if(typeof inputFields !== 'undefined' || inputFields =='null'){
  // this statement will execute
  val.push(Arr[0])
}else{
 val.push(inputFields) 
}
const val1=[]
 if(typeof inputFieldsA !== 'undefined' || inputFieldsA =='null'){
  val1.push(Arr[1])
}else{
 val1.push(inputFieldsA) 
}
const val2=[]
 if(typeof inputFieldsP !== 'undefined' || inputFieldsP =='null'){
  // this statement will execute
  val2.push(Arr[2])
}else{
 val2.push(inputFieldsP) 
}
const array_values=[...val[0],...val1[0],...val2[0]]
const Keysvalue=[]
console.log("A",array_values.map(element => {
    Keysvalue.push(element[2])
}))     
console.log("A",Arr[0].forEach(element => {
  Keys.push(element[1])
}))
console.log("A",Arr[1].forEach(element => {
  Keys.push(element[1])
}))
console.log("A",Arr[2].forEach(element => {
  Keys.push(element[1])
}))
      
          console.log("values",Keysvalue)
          console.log("Keys",Keys)
          var Final_String='';
          const buildMap = (keys, values) => {
            const map = new Map();
            for(let i = 0; i < keys.length; i++){
              Final_String+=keys[i]+'='+values[i]+',' 
              map.set(keys[i], values[i]);
            };
            return map;
         };
         const MAP= buildMap(Keys,Keysvalue)
 console.log("MAP",MAP)
 const mixedSum = (arr = []) => {
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
     const el = arr[i];
     sum += +el;
  };
  return sum;
};
const Machinename=NEWTAB.get("Machine_name")
const INDEX=NEWTAB.get("Cycle")
const StartTime=NEWTAB.get("Starttime")
const EndTime=NEWTAB.get("Endtime")
const id=EntryTime
const PartTool=part

         Final_String =Final_String.substring(0, Final_String.length - 1);
   var myArray = Final_String.split(",").join(",").replaceAll(" ", "\\ ");
  //  console.log("select plan"+PartTool+INDEX+StartTime+EndTime)
  //  const id=Machinename+'_'+PartTool+'_'+StartTime;
         const newvalue= 'NEWTAB_1 id=\"'+id+'\",Part_Tool=\"'+PartTool+'\",Cycle='+INDEX+',Starttime='+StartTime+',Endtime='+EndTime+',Machine_name=\"'+Machinename+'\",'+myArray+',Rej_qt='+mixedSum(Keysvalue)+' '+String(Date.now())+'000000'
   console.log("newvalue from form",newvalue) 
   fetch('http://localhost:8080/entrysubmit',{
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // body: JSON.stringify({newvalue})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))
        setTimeout(handleDialog1("Submitted",true), 1000)
 
        window.location.reload();     
        ShowForms()
       
       
       
       
        // window.location.reload()
        }
      //   const handleCancel=()=>{
      //     seteditOrgid(null)
      // }
return (
      
      <div className="overlay-scrollbar" id='body'>
          <div className="navbar">
            <ul className="navbar-nav" >
              <li className="nav-item">
                <div className="nav-link" >
                  <i className="fas fa-bars"  onClick={({target})=> collapseSidebar(target)}  />
                </div>
              </li>
              <li className="nav-item">
                <img src={logo} alt="logo" className="logo logo-light" />
              </li>
            </ul>
            <ul className="navbar-nav nav-right">
            <div className="nav-link">
                  {/* <span>{valuestored1.map(Role=>Role.Role.toUpperCase())}</span> */}
                </div>
            
                <li className="nav-item dropdown">
            <div className="nav-link">
              <i
                className="fas fa-bell dropdown-toggle"
                data-toggle="notification-menu"
              />
              <span className="navbar-badge">2</span>
            </div>
            <ul
              id="notification-menu"
              className="dropdown-menu notification-menu"
            >
              <div className="dropdown-menu-header">
                <span>Notifications</span>
              </div>
              <div className="dropdown-menu-content overlay-scrollbar scrollbar-hover">
                <li className="dropdown-menu-item">
                  <Link to="#" className="dropdown-menu-link">
                    <div>
                      <i className="fas fa-gift" />
                    </div>
                    <span>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      <br />
                      <span>15/07/2021</span>
                    </span>
                  </Link>
                </li>
                <li className="dropdown-menu-item">
                  <Link to="#" className="dropdown-menu-link">
                    <div>
                      <i className="fas fa-tasks" />
                    </div>
                    <span>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                      <br />
                      <span>15/07/2021</span>
                    </span>
                  </Link>
                </li>
              </div>
              <div className="dropdown-menu-footer">
                <span>View all notifications</span>
              </div>
            </ul>
          </li>
              <li className="nav-item avt-wrapper">
            <div className="avt dropdown">
              <img
                src={admin}
                alt="User image"
                className="dropdown-toggle"
                data-toggle="user-menu"
              />
              <ul id="user-menu" className="dropdown-menu">
                <li className="dropdown-menu-item">
                  <div className="dropdown-menu-link">
                    <div>
                      <i className="fas fa-user-tie" />
                    </div>
                    {/* <span>{valuestored1.map((name) => name.First_name)}</span> */}
                    {/* <span>{valuestored1.First_name}</span> */}
                  </div>
                </li>
                <li className="dropdown-menu-item">
                  <Link to="#" className="dropdown-menu-link">
                    <div>
                      <i className="fas fa-cog" />
                    </div>
                    <span>Settings</span>
                  </Link>
                </li>
                <li className="dropdown-menu-item">
                <Link to="/" className="dropdown-menu-link" onClick={logOut}>
                    <div>
                      <i
                        // onClick={navigate("/")}
                        className="fas fa-sign-out-alt"
                      />
                    </div>
                    <span
                    // onClick={logout()}
                    // onClick={navigate("/")}

                    // onClick={AuthService.logout}
                    >
                      Logout
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
            </ul>
          </div>
          <div className="sidebar">
            <ul className="sidebar-nav">
              <li className="sidebar-nav-item">
            <Link to="/home" className="sidebar-nav-link">
              <div>
                <i className="fas fa-house-user"></i>
              </div>
              <span>Home</span>
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link to="/organization" className="sidebar-nav-link ">
              <div>
                <i className="fas fa-sitemap" />
              </div>
              <span>Organization</span>
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link to="/department" className="sidebar-nav-link">
              <div>
                <i className="fas fa-chart-line"></i>
              </div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebars-nav-item">
              <div className="sidebars-nav-link" 
              onClick={onClickdrop}
              >
              <div>
                <i className="fas fa-users-cog" />
              </div>
              <span>Users</span>
              <i id='admin' class="fa fa-caret-down" />
              </div>
              { 
              showResults &&
           <div class="dropdown-container">
           <li className="sidebar-nav-item">
            <Link to="/admin" className="sidebar-nav-link ">
              <div>
                <i className="fas fa-users-cog" />
              </div>
              <span>Admin</span>
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link to="/distributor" className="sidebar-nav-link">
              <div>
                <i className="fas fa-boxes" />
              </div>
              <span>Distributor</span>
            </Link>
          </li>
          <li className="sidebar-nav-item">
            <Link to="/customer" className="sidebar-nav-link">
              <div>
                <i className="fas fa-people-carry" />
              </div>
              <span>Customer</span>
            </Link>
          </li>
          </div>
            }
          </li>
          <li className="sidebars-nav-item">
          <Link to="/production" className="sidebar-nav-link active">
              <div>
                <i className="fas fa-industry" />
              </div>
              <span>Production</span>
              {/* <i id='admins' class="fa fa-caret-down" /> */}
              </Link>
              {/* { 
              showResults1 &&
           <>
           <li className="sidebar-nav-item" >
                <Link to="/prdhome" className="sidebar-nav-link ">
                  <div>
                  <i className="fas fa-house-user"></i>
                  </div>
                  <span>
                  Admin Tools
                  </span>
                </Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/dataentry" className="sidebar-nav-link ">
                  <div>
                    <i className="fas fa-boxes" />
                  </div>
                  <span>Data Entry</span>
                </Link>
              </li>
              <li className="sidebar-nav-item" >
                <Link to="/Edataentry" className="sidebar-nav-link active">
                  <div>
                  <i className="fas fa-house-user"></i>
                  </div>
                  <span>
                  Edit/Review Entry
                  </span>
                </Link>
              </li>
              </>
              } */}
              </li>
            </ul>
          </div>
          {/* end sidebar */}
          {/* main content */}
          <div className="wrapper">
          <h3 style={{textAlign: "center",fontWeight:'bold'}}>
                    Edit/Review Entry 
                      </h3>
            <div className="row">
              <div className="col-12 col-m-12 col-sm-12">
                <div className="card2">
                   <div className="card-content">
                        <tr>
                          <th>Select Plan</th>
                          <td>
                          <select 
                          className='select1'
                          id="PartTool" 
                          onChange={handlechangeEntryTime}>
                             <option  disabled selected="selected">--Select Plan --</option> 
                            {Entry} 
                          </select>
                          </td>
                          <td>
                          <button className='select1'style={{marginLeft:'70px',marginRight: '70px'}} onClick={(event)=>handleclick(event,NEWTAB)}>Show values </button>
                          </td>
                          <td> <i class="far fa-trash-alt fa-2x" style={{marginLeft:'400px'}}
                      onClick={handleDelete}
                      ></i></td>
                       </tr>
                 {ShowForm &&(     
                 <form className="form" 
                 onSubmit={handleEditFormSubmit}
                 > 
                        <table className="data-table">
                         <thead>
                         <tr>
                         </tr>
                        </thead>
                            <tbody>
                            <tr>
                          <th>Machine Name</th>
                            <td>{NEWTAB.get("Machine_name")}</td>
                          </tr>   
                          <tr>
                          <th>Cycle Time</th>
                            <td>{NEWTAB.get("Cycle")}</td>
                          </tr>
                         <tr>
                          <th>Operating Time</th>
                            <td>{dateString}</td>
                          <td>{dateString1}</td>
                       </tr>
                       { Arr[0]?.map((input, index) => {
                        return(
               <tr key={`item${index}`}>
               <th>Reason for Rejection(Qty)</th>
               <td>{input[1]}</td>
                  <td >
               <input
                placeholder={`${index + 1}`}
                name={`${index}`}
                required type="number"
                defaultValue={input[2]}
                onChange={(e) => handleChange(e,index)}
                />
              </td>
              
            </tr>
        )})}
         {Arr[1]?.map((input, index) => {
                        return(
               <tr key={`item${index}`}>
               <th>Setup & Adjustment loss(Min)</th>
               <td>{input[1]}</td>
                  <td >
               <input
                placeholder={`${index + 1}`}
                name={`${index}`}
                required type="number"
                defaultValue={input[2]}
                onChange={(e) => handleChangeA(e,index)}
                />
              </td>
            </tr>
        )})}
         {Arr[2]?.map((input, index) => {
                        return(
               <tr key={`item${index}`}>
                 <th>Production loss(Min)</th>
               <td>{input[1]}</td>
                  <td>
               <input
                placeholder={`${index + 1}`}
                name={`${index}`}
                required type="number"
                defaultValue={input[2]}
                onChange={(e) => handleChangeP(e,index)}
                />
              </td>
            </tr>
              )})}
                      </tbody>
                      </table>
                      <div className="card-header" style={{width:'10%',marginLeft:'40%',marginRight:'50%'}}>
                      <button type="submit" 
                      className="Submit"  style={{ textAlign: "center",cursor: "pointer",backgroundColor: "#4CAF50",border: "none",color: "white",display: "center",fontSize: "18px",padding:"2px 12px 2px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
                        </div>
                      </form>
                      )}
                      {dialog1.isLoading && (
                              <Success
                                //Update
                                // nameProduct={dialog.nameProduct}
                                // onDialog={areUSureDelete}
                                message={dialog1.message}
                              />
                            )}
                     {dialog.isLoading && (
                              <Dialog
                                //Update
                                // nameProduct={dialog.nameProduct}
                                onDialog={areUSureDelete}
                                message={dialog.message}
                              />
                            )}
                     
                       {/* </> 
                     
                       
                   ) )   } */}
                  </div>
              
                </div>
              
              </div>
            </div>
          </div>
  
          </div>
                        )
}
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps)(ListForm);
export default ListForm5