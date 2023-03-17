import React from 'react'
import { useState } from 'react'
import ChartModel from './ChartModel';
import { useRef } from 'react';
import Axios from "axios";
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
// import LineChart from './LineChart';
import PieChart from './PieChart';
import BarChart from './BarChart.js';
// import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
// import '@wojtekmaj/react-datetimerange-picker/dist/DateTimeRangePicker.css';
// import 'react-calendar/dist/Calendar.css';
import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import { useParams } from 'react-router-dom';
import AreaChart from './AreaChart';
import MenuDivider from 'antd/lib/menu/MenuDivider';
// import DateTimeRangePicker from 'react-datetimerange-picker/dist/entry.nostyle';
function Models({match}) {
  const [showResults, setShowResults] = useState(false)
  const onClickdrop = () => {
    setShowResults(!showResults)
  }
  const {Did}=useParams()

  // const {
  //   params: { Did },
  // } = match;
  
  const [did,setDid]=useState('')
  const [DASHNAME,setDashboardName]=useState('')
  

  // let navigate=useNavigate()
  useEffect(()=>{
    const abortCont=new AbortController();
    setDid(Did)
  return()=>{
    abortCont.abort();
  }    
   },[])
  


  // console.log(":::::::::")
// console.log(Did)
  // const Did=params.Did;
  const form = useRef();
  // const [value, onChange] = useState([new Date(), new Date()]);
  // const [value, setValue] = React.useState(new Date());
  // const [STime,setSTime]=useState('')
  // const [ETime,setETime]=useState('')
  const [LChart,setLChart]=useState([])
  const [BChart,setBChart]=useState([])
  const [PChart,setPChart]=useState([])
  const [AChart,setAChart]=useState([])

  const [ShowLineForm,setShowLineForm]=useState(false)
  const [ShowBarForm,setShowBarForm]=useState(false)
  const [ShowPieForm,setShowPieForm]=useState(false)
  const [ShowAreaForm,setShowAreaForm]=useState(false)

  // const [Showchart,setShowchart]=useState(false)
  // const [Line]=useState("Line")
  const [Title,setTitle]=useState('')
  const [Yaxis,setYaxis]=useState('')
  const [Label,setLabel]=useState('')
  const [Keys,setKeys]=useState('')
  const [Dn,setDn]=useState('')
  const [StartTime1,setStartTime1]=useState('')
  const [EndTime1,setEndTime1]=useState('')
  // console.log(value)
  const ShowLineForms= () => {
    setShowLineForm(!ShowLineForm);
    
  }
  const ShowBarForms= () => {
    setShowBarForm(!ShowBarForm);
    
  }
  const ShowPieForms= () => {
    setShowPieForm(!ShowPieForm);
    
  }
  const ShowAreaForms= () => {
    setShowAreaForm(!ShowAreaForm);
    
  }
 
  
  
  // const ShowCharts= () => {
  //   setShowchart(!Showchart);
  // }
  
  //  LChart.forEach(function(e){
  //   if (typeof e === "object" ){
  //     e["Cid"] = did
  //   }
  // });
  //  console.log("LChart")
  // console.log(LChart)
//  const LCID=LChart.map((crypto) => crypto.Cid);
//  console.log("Cid of Line Chart"+" "+LCID);
//  useEffect(() => {
//   const abortCont=new AbortController();
//   fetch('http://localhost:8080/api/BChart',{
//     'methods':'GET',
//     headers:{
//       'Content-Type':'applications/json'
//     }
//   })
//   .then(resp =>resp.json())
//   .then(resp =>setBChart(resp))
//   .catch(error =>console.log(error))
//   return()=>{
//     abortCont.abort();
//   }

// },[]);
// useEffect(() => {
//   const abortCont=new AbortController();
//   fetch('http://localhost:8080/api/PChart',{
//     'methods':'GET',
//     headers:{
//       'Content-Type':'applications/json'
//     }
//   })
//   .then(resp =>resp.json())
//   .then(resp =>setPChart(resp))
//   .catch(error =>console.log(error))
//   return()=>{
//     abortCont.abort();
//   }

// },[]);

//  console.log("Response of PieChart"+" "+PChart);

// const BCID=BChart.map((crypto) => crypto.Cid);
//  console.log("Cid of Bar Chart"+" "+BCID);
const insertLineChart = () => {
  // e.preventDefault();
  Axios.post("http://localhost:8080/ChartLine", {
    // Cname: Title,
    // Labels: Xaxis,
    // NPDLMS1-M52
    Did:did,
    LCname: Title,
    Keys:Keys,
    Dn:Dn,
    StartTime:StartTime1,
    EndTime:EndTime1,
    Yaxis: Yaxis,
    Label: Label,

  }).then(() => {
  }).then((response) => {
    console.log("success Chart");
    console.log(response)
    console.log("success Chart");
  })
  window.location.reload();
}
const insertBarChart = () => {
  // e.preventDefault();
  Axios.post("http://localhost:8080/ChartBar", {
    // Cname: Title,
    // Labels: Xaxis,
    // NPDLMS1-M52
    Did:did,
    BCname: Title,
    Keys:Keys,
    Dn:Dn,
    StartTime:StartTime1,
    EndTime:EndTime1,
    Yaxis: Yaxis,
    Label: Label,

  }).then(() => {
  }).then((response) => {
    console.log("success Chart");
    console.log(response)
    console.log("success Chart");
  })
  window.location.reload();
}
const insertPieChart = () => {
  // e.preventDefault();
  Axios.post("http://localhost:8080/ChartPie", {
    // Cname: Title,
    // Labels: Xaxis,
    // NPDLMS1-M52
    Did:did,
    LCname: Title,
    Keys:Keys,
    Dn:Dn,
    StartTime:StartTime1,
    EndTime:EndTime1,
    Yaxis: Yaxis,
    Label: Label,

  }).then(() => {
  }).then((response) => {
    console.log("success Chart");
    console.log(response)
    console.log("success Chart");
  })
  window.location.reload();
}
const insertAreaChart = () => {
  // e.preventDefault();
  Axios.post("http://localhost:8080/ChartArea", {
    // Cname: Title,
    // Labels: Xaxis,
    // NPDLMS1-M52
    Did:did,
    LCname: Title,
    Keys:Keys,
    Dn:Dn,
    StartTime:StartTime1,
    EndTime:EndTime1,
    Yaxis: Yaxis,
    Label: Label,

  }).then(() => {
  }).then((response) => {
    console.log("success Chart");
    console.log(response)
    console.log("success Chart");
  })
  // window.location.reload();
}
    //  console.log("Chart=========="+JSON.stringify(Chart[0]));
  
const { RangePicker } = DatePicker;

const onChange = (value) => {
  let Value= JSON.stringify(value)
  console.log("Ndtime")
let date=Value.replace(/[\[\]']+/g,'')
let value1 = date.replace(/\"/g, "");
let newArray = value1.split(',');
var start=newArray[0];
var End=newArray[1];
var StartTime = ((new Date(start)).getTime() /1000) *1000;
var EndTime = ((new Date(End)).getTime() /1000) *1000;
console.log(StartTime);
console.log(EndTime);
// setSTime(StartTime);
// setETime(EndTime);

Axios.post("http://localhost:8080/Globaltime", {
    StartTime: StartTime,
    EndTime: EndTime,
    Did:did
    
  }).then((response) => {
    console.log("success Chart");
    console.log("FROM FRONT"+JSON.stringify(response))
  

  })
  window.location.reload();
};
const onTime = (value) => {
  let Value1= JSON.stringify(value)
  console.log("Ndtime")
let date=Value1.replace(/[\[\]']+/g,'')
let value2 = date.replace(/\"/g, "");
let newArray1 = value2.split(',');
var start1=newArray1[0];
var End1=newArray1[1];
var StartTime1 = ((new Date(start1)).getTime() /1000) *1000;
var EndTime1 = ((new Date(End1)).getTime() /1000) *1000;
console.log(StartTime1);
console.log(EndTime1);
setStartTime1(StartTime1)
setEndTime1(EndTime1);
// setSTime(StartTime);
// setETime(EndTime);



};
// const NewTime = () => {
//   Axios.post("http://localhost:8080/ChartLine", {
//     StartTime: STime,
//     EndTime: ETime,
//   }).then(() => {
//     console.log("success Chart");
//   })
  
//   }
console.log(":::::::::")
// console.log(STime)
// console.log(ETime)
console.log("DID in dashboard ",Did)
console.log("dashboard in dashboard ",DASHNAME)

useEffect(() => {
  const abortCont=new AbortController();
  Axios.post("http://localhost:8080/DashName", {
    Did: Did,
 
  }).then((response) => {
    console.log("success Dashname",response.data.recordsets[0].map(date=>date.Dname));
    // console.log(
     setDashboardName(JSON.stringify(response.data.recordsets[0].map(date=>date.Dname)).replace(/[\[\]']+/g,''))
      // )
  })
    return()=>{
      abortCont.abort();
    }
}, []);
useEffect(() => {
  const abortCont=new AbortController();
  Axios.post("http://localhost:8080/LChart", {
  Did:Did,
}) 
.then(resp =>console.log(setLChart(resp.data.recordsets[0]).replace(/[\[\]']+/g,'')))
.catch(error =>console.log(error))

  return()=>{
    abortCont.abort();
  }
},[]);
useEffect(() => {
  const abortCont=new AbortController();
  Axios.post("http://localhost:8080/BChart", {
  Did:Did,
}) 
.then(resp =>console.log(setBChart(resp.data.recordsets[0]).replace(/[\[\]']+/g,'')))
.catch(error =>console.log(error))

  return()=>{
    abortCont.abort();
  }
},[]);
useEffect(() => {
  const abortCont=new AbortController();
  Axios.post("http://localhost:8080/PChart", {
  Did:Did,
}) 
.then(resp =>console.log(setPChart(resp.data.recordsets[0]).replace(/[\[\]']+/g,'')))
.catch(error =>console.log(error))

  return()=>{
    abortCont.abort();
  }
},[]);
useEffect(() => {
  const abortCont=new AbortController();
  Axios.post("http://localhost:8080/AChart", {
  Did:Did,
}) 
.then(resp =>console.log(setAChart(resp.data.recordsets[0]).replace(/[\[\]']+/g,'')))
.catch(error =>console.log(error))

  return()=>{
    abortCont.abort();
  }
},[]);
// console.log("LChart Values")
// console.log(LChart)
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
      // 
      // Close dropdown when click out of dropdown menu
      // 
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
            {/* end nav left */}
            {/* form */}
            <form className="navbar-search">
              <input type="text" name="Search" className="navbar-search-input" placeholder="What you looking for..." />
              <i className="fas fa-search" />
            </form>
           
            <ul className="navbar-nav nav-right">
              <li className="nav-item dropdown">
                <div className="nav-link">
                  <i className="fas fa-bell dropdown-toggle" data-toggle="notification-menu" />
                  <span className="navbar-badge">2</span>
                </div>
                <ul id="notification-menu" className="dropdown-menu notification-menu">
                  <div className="dropdown-menu-header">
                    <span>
                      Notifications
                    </span>
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
                          <span>
                            15/07/2021
                          </span>
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
                          <span>
                            15/07/2021
                          </span>
                        </span>
                      </Link>
                    </li>
                  </div>
                  <div className="dropdown-menu-footer">
                    <span>
                      View all notifications
                    </span>
                  </div>
                </ul>
              </li>
              <li className="nav-item avt-wrapper" >
                <div className="avt dropdown">
                  <img src={admin} alt="User image" className="dropdown-toggle" data-toggle="user-menu" />
                  <ul id="user-menu" className="dropdown-menu">
                    <li className="dropdown-menu-item">
                    <Link to="#" className="dropdown-menu-link">
                        <div>
                          <i className="fas fa-user-tie" />
                        </div>
                        <span>Profile</span>
                      </Link>
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
                    <Link to="#" className="dropdown-menu-link">
                        <div>
                          <i className="fas fa-sign-out-alt" />
                        </div>
                        <span>Logout</span>
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
            <Link to="/department" className="sidebar-nav-link active">
              <div>
                <i className="fas fa-chart-line"></i>
              </div>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebars-nav-item">
              <div className="sidebars-nav-link" onClick={onClickdrop}>
              <div>
                <i className="fas fa-users-cog" />
              </div>
              <span>Users</span>
              <i id='admin' class="fa fa-caret-down" />
              </div>
              { showResults &&
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
          <Link to="/production" className="sidebar-nav-link">
              <div>
                <i className="fas fa-industry" />
              </div>
              <span>Production</span>
              {/* <i id='admins' class="fa fa-caret-down" /> */}
              </Link>
              {/* { 
              showResults1 &&
           <div class="dropdown-container">
              <li className="sidebar-nav-item" >
                <Link to="/prdhome" className="sidebar-nav-link">
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
                    <i className="fas fa-boxes"/>
                  </div>
                  <span>Data Entry</span>
                </Link>
              </li>
              <li className="sidebar-nav-item" >
                <Link to="/Edataentry" className="sidebar-nav-link">
                  <div>
                  <i className="fas fa-house-user"></i>
                  </div>
                  <span>
                  Edit/Review Entry
                  </span>
                </Link>
              </li>
              </div>
             } */}
             </li>
            </ul>
          </div>
          {/* end sidebar */}
          {/* main content */}
           <div className="wrapper">
           <h2 style={{textAlign:'center',fontWeight:'bold'}}> {DASHNAME.replace(/"/g, "")}</h2> 
           <ul className="navbar-nav">
          <li className="nav-link">
          <button className="button-16" 
   onClick={ ShowLineForms }>
     Line Chart
     </button>
     </li>
     <li className="nav-link">
     <button className="button-16" 
   onClick={ ShowLineForms }>
     Bar Chart
     </button>
     </li>
     <li className="nav-link">
       <button className="button-16"
   onClick={ ShowLineForms }>
     Pie Chart
     </button>
     </li>
     <li className="nav-link">
     <button className="button-16" 
   onClick={ ShowLineForms }>
     Area Chart
     </button>
     </li>
   <li className="nav-links nav-right">
   <span style={{fontWeight:'bold'}}>Global Time  </span>
  
   <RangePicker 
      showTime={{
        format: 'HH:mm',
      }}
      format="YYYY-MM-DD HH:mm"
      onChange={onChange}
    />
    </li>
    </ul>
   {ShowLineForm && (
     <div className="card2" style={{display:'flex', flexDirection: 'row'}}>
                      <input type="text" name="Title"
                          value={Title} 
                         className="form-control"   placeholder="Line Chart Title"required="text" 
                         onChange={(e)=>setTitle(e.target.value)}
                         />
                         <input type="text" name="Dn"
                          value={Dn} 
                         className="form-control" placeholder="Dn"required="text" 
                         onChange={(e)=>setDn(e.target.value)}
                         />
                         <input type="text" name="Keys"
                          value={Keys} 
                         className="form-control" placeholder="Keys"required="text" 
                         onChange={(e)=>setKeys(e.target.value)}
                         />
                         <div className="form-control">
                          <RangePicker  
                          style={{width:"349px",height:"36px"}} 
                          showTime={{format: 'HH:mm', }} format="YYYY-MM-DD HH:mm" onChange={onTime}  /></div>
                      <input type="text" name="Yaxis" 
                       value={Yaxis} 
                       className="form-control" placeholder="Yaxis"required="text" 
                      onChange={(e)=>setYaxis(e.target.value)}
                      />
                      <input type="text" name="Label" 
                       value={Label} 
                       className="form-control" placeholder="Label"required="text" 
                      onChange={(e)=>setLabel(e.target.value)}
                      />
                      <button type="submit" 
                      onClick={insertLineChart} 
                      className="button submit" 
                      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",marginRight:"5px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
</div>
)}
 {ShowBarForm && (
     <div className="card2" style={{display:'flex', flexDirection: 'row'}}>
                      <input type="text" name="Title"
                          value={Title} 
                         className="form-control"   placeholder="Bar Chart Title"required="text" 
                         onChange={(e)=>setTitle(e.target.value)}
                         />
                         <input type="text" name="Dn"
                          value={Dn} 
                         className="form-control" placeholder="Dn"required="text" 
                         onChange={(e)=>setDn(e.target.value)}
                         />
                         <input type="text" name="Keys"
                          value={Keys} 
                         className="form-control" placeholder="Keys"required="text" 
                         onChange={(e)=>setKeys(e.target.value)}
                         />
                         <div className="form-control">
                          <RangePicker  
                          style={{width:"349px",height:"36px"}} 
                          showTime={{format: 'HH:mm', }} format="YYYY-MM-DD HH:mm" onChange={onTime}  /></div>
                      <input type="text" name="Yaxis" 
                       value={Yaxis} 
                       className="form-control" placeholder="Yaxis"required="text" 
                      onChange={(e)=>setYaxis(e.target.value)}
                      />
                      <input type="text" name="Label" 
                       value={Label} 
                       className="form-control" placeholder="Label"required="text" 
                      onChange={(e)=>setLabel(e.target.value)}
                      />
                      <button type="submit" 
                      onClick={insertBarChart} 
                      className="button submit" 
                      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",marginRight:"5px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
</div>
)}
 {ShowPieForm && (
     <div className="card2"  style={{display:'flex', flexDirection: 'row'}}>
                      <input type="text" name="Title"
                          value={Title} 
                         className="form-control"   placeholder="Pie Chart Title"required="text" 
                         onChange={(e)=>setTitle(e.target.value)}
                         />
                         <input type="text" name="Dn"
                          value={Dn} 
                         className="form-control" placeholder="Dn"required="text" 
                         onChange={(e)=>setDn(e.target.value)}
                         />
                         <input type="text" name="Keys"
                          value={Keys} 
                         className="form-control" placeholder="Keys"required="text" 
                         onChange={(e)=>setKeys(e.target.value)}
                         />
                         <div className="form-control">
                          <RangePicker  
                          style={{width:"349px",height:"36px"}} 
                          showTime={{format: 'HH:mm', }} format="YYYY-MM-DD HH:mm" onChange={onTime}  /></div>
                      <input type="text" name="Yaxis" 
                       value={Yaxis} 
                       className="form-control" placeholder="Yaxis"required="text" 
                      onChange={(e)=>setYaxis(e.target.value)}
                      />
                      <input type="text" name="Label" 
                       value={Label} 
                       className="form-control" placeholder="Label"required="text" 
                      onChange={(e)=>setLabel(e.target.value)}
                      />
                      <button type="submit" 
                      onClick={insertPieChart} 
                      className="button submit" 
                      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",marginRight:"5px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
</div>
)}
 {ShowAreaForm && (
     <div className="card2" style={{display:'flex', flexDirection: 'row'}}>
                      <input type="text" name="Title"
                          value={Title} 
                         className="form-control"   placeholder="Area Chart Title"required="text" 
                         onChange={(e)=>setTitle(e.target.value)}
                         />
                         <input type="text" name="Dn"
                          value={Dn} 
                         className="form-control" placeholder="Dn"required="text" 
                         onChange={(e)=>setDn(e.target.value)}
                         />
                         <input type="text" name="Keys"
                          value={Keys} 
                         className="form-control" placeholder="Keys"required="text" 
                         onChange={(e)=>setKeys(e.target.value)}
                         />
                         <div className="form-control">
                          <RangePicker  
                          style={{width:"349px",height:"36px"}} 
                          showTime={{format: 'HH:mm', }} format="YYYY-MM-DD HH:mm" onChange={onTime}  /></div>
                      <input type="text" name="Yaxis" 
                       value={Yaxis} 
                       className="form-control" placeholder="Yaxis"required="text" 
                      onChange={(e)=>setYaxis(e.target.value)}
                      />
                      <input type="text" name="Label" 
                       value={Label} 
                       className="form-control" placeholder="Label"required="text" 
                      onChange={(e)=>setLabel(e.target.value)}
                      />
                      <button type="submit" 
                      onClick={insertAreaChart} 
                      className="button submit" 
                      style={{marginTop:"10px",marginBottom:"10px",marginLeft:"5px",marginRight:"5px",backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
</div>
)}
<div className="grid-container">
    { 
               LChart && LChart.map(line=>(
                <div>
                  <tr  className="card1">
                     <td>
                      <ChartModel LChart={line}/>
                       </td>
                   </tr>
                   </div>
                    ) ) }
                    { BChart && BChart.map(line=>(
                      <div>
                  <tr  className="card1">
                     <td>
                      <BarChart BChart={line}/>
                       </td>
                   </tr>
                   </div>
                    ) )
                  }
                  { PChart && PChart.map(line=>(
                    <div>
                  <tr  className="card1">
                    <td>
                      <PieChart PChart={line}/>
                    </td>
                   </tr>
                   </div>
                    ) )
                  }
                   { AChart && AChart.map(line=>(
                    <div>
                    <tr  className="card1">
                      <td>
                        <AreaChart AChart={line}/>
                        </td>
                    </tr>
                    </div>
                      ) )
                    }
        </div>
   </div>
   </div>
    )
}

export default Models