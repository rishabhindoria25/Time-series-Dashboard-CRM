import React,{ useState ,useEffect, Fragment} from 'react';
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import {Link} from 'react-router-dom';
// import '../static/Admin.css'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'; 
import './Listform4.css';
import axios from 'axios';
import Dialog from '../Prdhomepage/Dialog';
import Success from './Success';
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";

function ListForm4() {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const [showResults, setShowResults] = useState(false)
  const onClickdrop = () => {
    setShowResults(!showResults)
  }
  const [showResults1, setShowResults1] = useState(true)
  const onClickdrops = () => {
    setShowResults1(!showResults1)
  }
  const [valuestored1,setvaluestored1]=useState([])
  const [valuestored2,setvaluestored2]=useState([])

  const [textAreaNo,setTextAreaNo] = useState(0);
  const [textAreaNo1,setTextAreaNo1] = useState(0);
  const [textAreaNo2,setTextAreaNo2] = useState(0);
  const [valuestoredRej,setvaluestoredRej]=useState([])
  const [valuestoredAdj,setvaluestoredAdj]=useState([])
  const [valuestoredPrd,setvaluestoredPrd]=useState([])
  const [PartTool, setPartTool] = useState('');
  const [Machinename, setMachinename] = useState('');

  const [Adj, setAdj] = useState([]);
  const [AdjQ, setAdjQ] = useState([]);
  const [Rej, setRej] = useState([]);
  const [RejQ, setRejQ] = useState([]);
  const [RQ, setRQ] = useState([]);

  const [Prd, setPrd] = useState([]);
  const [PrdQ, setPrdQ] = useState([]);
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/value',{
      method:'GET',
      headers:{
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    // .then(response=>setvaluestored1(response.results[0].series[0].values))
    .then(response=>setvaluestored1(response))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/machinevalue',{
      method:'GET',
      headers:{
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setvaluestored2(response))
    // .then(response=>setvaluestored2(response.results[0].series[0].values))
    // .then(res=>setvaluestoredRole(res[0].Role.toUpperCase()))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/Rejvalue',{
      method:'GET',
      headers:{
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setvaluestoredRej(response))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/Adjvalue',{
      method:'GET',
      headers:{
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setvaluestoredAdj(response))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  useEffect(()=>{
    const abortCont=new AbortController();
    fetch('http://localhost:8080/Prdvalue',{
      method:'GET',
      headers:{
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setvaluestoredPrd(response))
    // .then(response=>setvaluestoredPrd(response.results[0].series[0].values))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
let Part_Tool = valuestored1.length > 0
		&& valuestored1.map((item, i) => {
		return (
			<option key={i} value={item[1]}>{item[1]}</option>
		)
	})
  let Machine_name = valuestored2.length > 0
		&& valuestored2.map((item, i) => {
		return (
			<option key={i} value={item[1]}>{item[1]}</option>
		)
	})

  // let Part_ToolTime = valuestored1.length > 0
	// 	&& valuestored1.map((item, i) => {
	// 	return (
	// 		<option key={i} value={item[2]}>{item[2]}</option>
	// 	)
	// })
  let Rej_res = valuestoredRej.length > 0
		&& valuestoredRej.map((item, i) => {
		return (
			<option key={i} value={item[1]}>{item[1]}</option>
		)
	})
  // console.log(
    // setUploadNo(Rej_res.length)
  // )
  // console.log(uploadNo)
  let Adj_loss = valuestoredAdj.length > 0
		&& valuestoredAdj.map((item, i) => {
		return (
			<option key={i} value={item[1]}>{item[1]}</option>
		)
	})
  let Prd_loss = valuestoredPrd.length > 0
		&& valuestoredPrd.map((item, i) => {
		return (
			<option key={i} value={item[1]}>{item[1]}</option>
		)
	})
 
  // const[Quantmap,setQuantmap]=useState(Map);
//   const map1 = new Map();
// console.log(AdjQ)
// map1.set('a', 1);
// map1.set('b', 2);
// map1.set('c', 3);
  // const handlechangeRej = (e) =>{ 
    // e.preventDefault();
    
  //   if(!Rej) { setRej(e.target.value)
  // }else{
    // setRej(
      //  console.log(typeof(e.target.value));
      // Rej.push(e.target.value)
      // ) 
    //  Arr.push( e.target.value)
    // setRej(Rej+','+ e.target.value) 
  // };
// }
  // const handlechangeRejQ = (e) =>{
    // e.preventDefault();
    // let value = e.target.value;
    // RejQ.push(value); 
  //   if(!RejQ) { 
    // setRQ(e.target.value)
  // }else{
  //  console.log("hllo",e.target.value)
    // RejQ.push(e.target.value)

    // setRejQ(RejQ+','+ e.target.value)
  // };
// }

  // const handlechangeAdj = (e) =>{ if(!Adj) { setAdj(e.target.value)
  // }else{
    // Rej.push(e.target.value)
    // console.log(e.target.value);

    // setAdj(Adj+','+ e.target.value)
  // };
// }
  // const handlechangeAdjQ = (e) =>{ if(!AdjQ) { setAdjQ(e.target.value)
  // }else{
    // RejQ.push(e.target.value)
    // console.log(e.target.value);

    // setAdjQ(AdjQ+','+ e.target.value)
  // };
// }
// console.log(Adj)
// console.log(AdjQ)

  // const handlechangePrd = (e) =>{ if(!Prd) { setPrd(e.target.value)
  // }else{
  //   Rej.push(e.target.value)
  //   console.log(e.target.value);

    // setPrd(Prd+','+ e.target.value)
  // };
// }
  // const handlechangePrdQ = (e) =>{ if(!PrdQ) { 
  //   setPrdQ(e.target.value)
  // }else{
  //   RejQ.push(e.target.value)
  //   console.log(e.target.value);

    // setPrdQ(PrdQ+','+ e.target.value)
  // };
// }
// useEffect(()=>{
//  console.log("RQ",RQ)
// setRejQ(RQ)

// },[RQ])
// console.log("Rej",Rej)
// console.log("RejQ",RejQ)
// console.log("Adj",Adj)
// console.log("AdjQ",AdjQ)

  // const [INDEX, setINDEX] = useState();

 
  const handlechangePartTool = (e) => setPartTool(e.target.value);
  // const handleChangeCycleTime = (e) => setCycleTime(e.target.value);
  console.log("PartTool")
  console.log(PartTool)
  // console.log("CycleTime")
  // console.log(CycleTime)
  console.log(StartTime)
  console.log(EndTime)
  console.log("valuestored1")
  console.log(valuestored1)
  var INDEX;
  valuestored1.forEach((item, index)=>{
    console.log(index, item[1])
    if(item[1]===PartTool){
      INDEX=item[2]
        return;
    }
  })
  const handlechangeMachine = (e) => setMachinename(e.target.value);
  console.log("MachineName",Machinename)
  const { RangePicker } = DatePicker;

  // const onChange = (value, dateString) => {
  const onChange = (value) => {
    // console.log('selected Time: ',JSON.stringify(value));
    // setNDtime(JSON.stringify(value))
    let Value= JSON.stringify(value)
    console.log("Ndtime")
  let date=Value.replace(/[\[\]']+/g,'')
  let value1 = date.replace(/\"/g, "");
  let newArray = value1.split(',');
  var start=newArray[0];
  var End=newArray[1];
  var StartTime = ((new Date(start)).getTime() ) *1000000;
  var EndTime = ((new Date(End)).getTime() ) *1000000;
  console.log(StartTime);
  console.log(EndTime);
  setStartTime(StartTime);
  setEndTime(EndTime);
  // axios.post("http://localhost:8080/IndAreatime", {
  //     StartTime: StartTime,
  //     EndTime: EndTime,
  //     Cid:AChart.Cid
      
  //   }).then((response) => {
  //     console.log("success Chart");
  //     console.log("FROM FRONT"+JSON.stringify(response))
  //   })
  //   window.location.reload();
  
  };
  
  const [dialog, setDialog] = useState({
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

  const handleFormSubmit=(event)=>{
    event.preventDefault();
    let Final_String='';
    const buildMap = (keys, values) => {
      const map = new Map();
      for(let i = 0; i < keys.length; i++){
        Final_String+=keys[i]+'='+values[i]+',' 
        map.set(keys[i], values[i]);
      };
      return map;
   };
   const keys=[];
   const values=[];
  formValues.forEach((item)=>{
    keys.push(item.Rej)
  })
  formValues.forEach((item)=>{
    values.push(item.RejQ)
  })
  formValues1.forEach((item)=>{
    keys.push(item.Adj)
  })
  formValues1.forEach((item)=>{
    values.push(item.AdjQ)
  })
  formValues2.forEach((item)=>{
    keys.push(item.Prd)
  })
  formValues2.forEach((item)=>{
    values.push(item.PrdQ)
  })
 const MAP= buildMap(keys,values)
 console.log("MAP",MAP)
 const mixedSum = (arr = []) => {
  let sum = 0;
  for(let i = 0; i < arr.length; i++){
     const el = arr[i];
     sum += +el;
  };
  return sum;
};
  Final_String =Final_String.substring(0, Final_String.length - 1);
   var myArray = Final_String.split(",").join(",").replaceAll(" ", "\\ ");
   console.log("select plan"+PartTool+INDEX+StartTime+EndTime)
   const id=Machinename+'_'+PartTool+'_'+StartTime;

const newvalue= 'NEWTAB_1 id=\"'+id+'\",Part_Tool=\"'+PartTool+'\",Cycle='+INDEX+',Starttime='+StartTime+',Endtime='+EndTime+',Machine_name=\"'+Machinename+'\",'+myArray+',Rej_qt='+mixedSum(values)+' '+String(Date.now())+'000000'
   console.log("newvalue from form",newvalue) 
   fetch('http://localhost:8080/entrysubmit', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newvalue})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))
        setTimeout(handleDialog("Submitted",true), 1000)
      
        window.location.reload();     

      }
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
  const [formValues, setFormValues] = useState([{ Rej: "", RejQ : ""}])

  let handleChange = (i, e) => {
    let newFormValues = [...formValues];
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  }
console.log("formValues",formValues)
let addFormFields = () => {
    setFormValues([...formValues, { Rej: "", RejQ : ""}])
  }

let removeFormFields = (i) => {
    let newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues)
}
const [formValues1, setFormValues1] = useState([{ Adj: "", AdjQ : ""}])

let handleChangeA = (i, e) => {
  let newFormValues1 = [...formValues1];
  newFormValues1[i][e.target.name] = e.target.value;
  setFormValues1(newFormValues1);
}
console.log("formValues",formValues1)
let addFormFields1 = () => {
  setFormValues1([...formValues1, { Adj: "", AdjQ : ""}])
}

let removeFormFields1 = (i) => {
  let newFormValues1 = [...formValues1];
  newFormValues1.splice(i, 1);
  setFormValues1(newFormValues1)
}
const [formValues2, setFormValues2] = useState([{ Prd: "", PrdQ : ""}])

let handleChangeP = (i, e) => {
  let newFormValues2 = [...formValues2];
  newFormValues2[i][e.target.name] = e.target.value;
  setFormValues2(newFormValues2);
}
console.log("formValues",formValues2)
let addFormFields2 = () => {
  setFormValues2([...formValues2, { Prd: "", PrdQ : ""}])
}

let removeFormFields2 = (i) => {
  let newFormValues2 = [...formValues2];
  newFormValues2.splice(i, 1);
  setFormValues2(newFormValues2)
}


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
                <Link to="/dataentry" className="sidebar-nav-link active">
                  <div>
                    <i className="fas fa-boxes" />
                  </div>
                  <span>Data Entry</span>
                </Link>
              </li>
              <li className="sidebar-nav-item" >
                <Link to="/Edataentry" className="sidebar-nav-link ">
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
          <h3 style={{textAlign:'center',fontWeight:'bold'}}>
                         Data Entry 
                      </h3>
            <div className="row">
              <div className="col-10 col-m-12 col-sm-12">
                <div className='formdiv'>
                   <div className="card-content">
                   <form className="data"  onSubmit={handleFormSubmit}> 
                   {/* <form className="data"/> */}
                    <table className="data-table">
                     {/* <thead>
                     <tr>
                       </tr>
                    </thead> */}
                        <thead className='card2' >
                        <tr>
                        <th>Machine Name</th>
                        <td>
                          <select className='select'
                          name='Machine_name'
                          onChange={handlechangeMachine}
                          >
                            <option  disabled selected="selected">--Select  Plan--</option>
                            {Machine_name}
                            {/* {Part_Tool} */}
                          </select>
                          </td>
                          
                          <th >Production Plan</th>
                          <td>
                          <select className='select'
                          id="PartTool" name='PartTool' 
                          // value={Part_Tool}  
                          onChange={handlechangePartTool}
                          // required
                          // options={Part_Tool}
                          // options={options}
                          >
                            <option  disabled selected="selected">--Select Production Plan--</option>
                            {Part_Tool}
                          </select>
                          </td>
                          </tr>
                          <tr>
                          <th>Standard Cycle Time</th>
                          <td>
                          <select  
                           value={INDEX}  
                          className='select' id="CycleTime" name='CycleTime'>
                           {/* value={Part_ToolTime}
                            onChange={ handleChangeCycleTime}> */}
                            <option  disabled selected="selected">{INDEX}</option>
                        
                            {/* {Part_ToolTime} */}
                            </select>
                          </td>
                          
                          <th>Planned Time</th>
                          <td>
                          <RangePicker 
                           required
                          showTime={{ format: 'HH:mm'}} style={{maxWidth: '30ch', width: '100%',border: '1px solid var(--select-border)',borderRadius: '0.25em',fontSize: '1rem',padding: '0.25em 0.5em'}} format="YYYY-MM-DD HH:mm"onChange={onChange}/>
                          </td>
                          </tr>
                          </thead>
                         
                         {formValues.map((element, index) => (
                        <thead  className='card2' key={index}>
                         <th>Reason for Rejection(Qty)</th>
                          <td >
                          <select  className='select' id="Rej_res" name='Rej'required type="text"
                          value={element.Rej || ""}
                          // onChange={handlechangeRej}>
                            onChange={e => handleChange(index, e)}>
                          <option  selected="selected">--Select Reason for Rejection--</option>
                            {Rej_res}
                            </select>
                          </td>
                          <th></th>
                          <th style={{display:'flex'}}>
                      <input  type="number" name="RejQ" required value={element.RejQ || ""}
                      style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Qty" 
                        onChange={e => handleChange(index, e)}
                         />
                      
                       <th></th>
                {/* <th > */}
                {
                  index ? 
                  null
                  :<th>
                  <i className="fas fa-plus"   onClick={() => addFormFields()}
                 />
                  </th>
                }      
                {
                  index ? 
                  <i 
                  className='far fa-trash-alt'onClick={() => removeFormFields(index)}
                   ></i>
                  : null
                }
                 </th>
                {/* </th> */}
                 </thead>
            ))}
             {formValues1.map((element, index) => (
                        <thead  className='card2' key={index}>
                        <th>Setup & Adjustment loss(Min)</th>
                          <td >
                        
                          <select  className='select' id="Rej_res" name='Adj'required type="text"
                          value={element.Adj || ""}
                          // onChange={handlechangeRej}>
                            onChange={e => handleChangeA(index, e)}>
                          <option  selected="selected">--Select Setup&Adjustment loss--</option>
                          {Adj_loss}
                            </select>
                          </td>
                          <th></th>
                          <th style={{display:'flex'}}>
                      <input  type="number" name="AdjQ" required value={element.AdjQ || ""}
                      style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Min" 
                        onChange={e => handleChangeA(index, e)}
                         />
                       {/* </th> */}
                       <th></th>
                {/* <th > */}
                {
                  index ? 
                  null
                  :<th>
                  <i className="fas fa-plus"   onClick={() => addFormFields1()}
                 />
                  </th>
                }      
                {
                  index ? 
                  <i 
                  className='far fa-trash-alt'onClick={() => removeFormFields1(index)}
                   ></i>
                  : null
                }
                </th>
                 </thead>
            ))}
            {formValues2.map((element, index) => (
                        <thead  className='card2' key={index}>
                        <th>Production losses(Min)</th>
                          <td >
                        
                          <select  className='select' id="Rej_res" name='Prd'required type="text"
                          value={element.Prd || ""}
                          // onChange={handlechangeRej}>
                            onChange={e => handleChangeP(index, e)}>
                          <option  selected="selected">--Select Production loss--</option>
                          {Prd_loss}
                            </select>
                          </td>
                          <th></th>
                          <th style={{display:'flex'}}>
                      <input  type="number" name="PrdQ" required value={element.PrdQ || ""}
                      style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Min" 
                        onChange={e => handleChangeP(index, e)}
                         />
                       {/* </th> */}
                       <th>
                       </th>
                {/* <th > */}
                {
                  index ? 
                  null
                  :<th>
                  <i className="fas fa-plus"   onClick={() => addFormFields2()}
                 />
                  </th>
                }      
                {
                  index ? 
                  <i 
                  className='far fa-trash-alt'onClick={() => removeFormFields2(index)}
                   ></i>
                  : null
                }
                </th>
                 </thead>
               ))}
                      </table>
                      <div className="card-header" style={{width:'10%',marginLeft:'40%',marginRight:'50%'}}>
                      <button type="submit" 
                      className="Submit"  style={{ textAlign: "center",backgroundColor: "#4CAF50",border: "none",color: "white",display: "center",fontSize: "18px",padding:"2px 12px 2px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
                        </div>{dialog.isLoading && (
                              <Success
                                //Update
                                // nameProduct={dialog.nameProduct}
                                // onDialog={areUSureDelete}
                                message={dialog.message}
                              />
                            )}
                      </form>
                    
                  </div>
              
                </div>
              
              </div>
            </div>
          </div>
  
          // </div>
                        )
}
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps)(ListForm);
export default ListForm4