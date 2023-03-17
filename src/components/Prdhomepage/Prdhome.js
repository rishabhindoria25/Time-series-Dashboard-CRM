import React,{ Fragment} from 'react';
import { useState, useEffect } from "react";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import {Link} from 'react-router-dom';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
// import '../static/Admin.css'
import Cookies from 'js-cookie';
import Dialog from './Dialog';
import { useRef } from 'react';
import { store } from '../../State/store';
import { getDashboardorg } from "../../State/Action-creators";
// import {getValueAction} from '../../State/Action-creators';
import ListformEditableRow from './PrdhomeEditablerow';
import Listformtable from './Prdhometable';
import ListForm1 from '../Organization1/ListForm1';
import ListForm2 from '../Organization2/ListForm2';
import ListForm3 from '../Organization3/ListForm3';
import Machine from '../Machine/Machine';
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
// import { connect } from 'react-redux';
import { logout } from "../../State/Action-creators";

function Prdhome() {
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
  const [valueOrg,setvalueOrg]=useState([])
  // const [valuestored1,setvaluestored1]=useState([])
  useEffect(()=>{
    const abortCont=new AbortController();
    
    fetch('http://localhost:8080/value',{
      'methods':'GET',
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Content-Type':'applications/json',
      }
    }).then(response => response.json())
    .then(response=>setvalueOrg(response))
    // .then(res=>setvaluestoredRole(res[0].Role.toUpperCase()))
    .catch(error =>console.log(error))
    return()=>{
      abortCont.abort();
    }
  },[])
  console.log("valueOrg")
  console.log(valueOrg)
const [AddvalueOrg,setAddvalueOrg]=useState({
  Time:'',
Part_Tool:'',
Cycle:''
})
const[editFormData,seteditFormData]=useState({
  Time:'',
  Part_Tool:'',
  Cycle:''
})
const[editOrgid,seteditOrgid]=useState(null);
const handleEditclick=(event,article)=>{
  event.preventDefault();
  seteditOrgid(article[0])
  console.log("article[0]")
  console.log(article[0])
  const formValues={
    Time:article[0],
    Part_Tool:article[1],
    Cycle:article[2],
    // Part_Tool:AddvalueOrg[1],
    // Cycle:AddvalueOrg[2],
  }
  console.log("formValues")
  console.log(formValues)
  // const formValuesshow={
  //   Time:article[0],
  //   Part_Tool:article[1],
  //   Cycle:article[2],
  //   // Part_Tool:AddvalueOrg[1],
  //   // Cycle:AddvalueOrg[2],
  // }
  seteditFormData(formValues)
}
// console.log(editFormData)

const handleEditFormChange=(event)=>{
event.preventDefault();
const fieldName=event.target.getAttribute('name');
  const fieldValue=event.target.value;
   
  const newEditFormData={...editFormData};
  newEditFormData[fieldName]=fieldValue;
  seteditFormData(newEditFormData);
  
}

const handleEditFormSubmit=(event)=>{
  event.preventDefault();
  console.log("editFormData.Time")
  console.log(editFormData.Time)
  const isoStr = editFormData.Time
const date = new Date(isoStr);
const timestamp = String(date.getTime())+'000000';
console.log("timestamp")
console.log(timestamp)
 const newEditvalueOrg={
  
  Time:editFormData.Time,
  Part_Tool:editFormData.Part_Tool,
  Cycle:editFormData.Cycle,
}

let newEditvalue=[
  editFormData.Time,
  editFormData.Part_Tool,
  editFormData.Cycle
]
const newarticle=[...valueOrg];
console.log("newarticle")
console.log(newarticle)

const index=valueOrg.findIndex((article)=>article[0]===editFormData.Time)
console.log(index)
console.log("newEditvalueOrg")
console.log(newEditvalue)
newarticle[index]=newEditvalue;
setvalueOrg(newarticle)
seteditOrgid(null)
const newvalue= 'NEWTAB Part_Tool=\"'+(newEditvalueOrg.Part_Tool).replace(/\s+/g, "")+'\",Cycle='+newEditvalueOrg.Cycle+' '+timestamp
fetch('http://localhost:8080/valueedit', {
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



}

const handleAddFormChange=(event)=>{
  event.preventDefault();
  const fieldName=event.target.getAttribute('name');
  const fieldValue=event.target.value;
   
  const newFormData={...AddvalueOrg};
  newFormData[fieldName]=fieldValue;
  setAddvalueOrg(newFormData);
  console.log(newFormData)
}

const handleAddFormSubmit=(event)=>{
event.preventDefault();
const newvalueOrgshow={
  Time:AddvalueOrg[0],
  Part_Tool:AddvalueOrg.Part_Tool,
  Cycle:AddvalueOrg.Cycle,
}

let newvalueOrgnotshow=[
  AddvalueOrg[0],
  AddvalueOrg.Part_Tool,
  AddvalueOrg.Cycle
]
console.log("value submitted",AddvalueOrg)
console.log(Date.now())
const newvalueOrg= 'NEWTAB Part_Tool=\"'+(AddvalueOrg.Part_Tool)+'\",Cycle='+AddvalueOrg.Cycle+' '+ (String(Date.now())+'000000')
console.log(newvalueOrg)
const newvalueOrgs=[...valueOrg,newvalueOrgnotshow];
setvalueOrg(newvalueOrgs)
console.log(newvalueOrgs)
fetch('http://localhost:8080/valueadd', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({newvalueOrg})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))
 
  ShowForms()
}
const idProductRef = useRef();

const [dialog, setDialog] = useState({
  message: "",
  isLoading: false,
  //Update
  nameProduct: ""
});
// const idProductRef = useRef();
const handleDialog = (message, isLoading, nameProduct) => {
  setDialog({
    message,
    isLoading,
    //Update
    nameProduct
  });
};


const handleDelete=(event,article)=>{
  event.preventDefault();
  

handleDialog("Are you sure you want to delete?", true);
idProductRef.current = article;
}
const areUSureDelete = (choose) => {
  if (choose) {
  const newarticle=[...valueOrg];

    const index=valueOrg.findIndex((valueOrg)=>valueOrg[0]===idProductRef.current[0])
    console.log(index)
    const Oid=idProductRef.current[0]
    console.log("Oid")
    console.log(Oid)
   //  const isoStr = editFormData.Time
    const date1 = new Date (Oid.toString());
    const timestampDel = String(date1.getTime())+'000000';
    console.log(timestampDel)
   newarticle.splice(index,1);
   setvalueOrg(newarticle)
   fetch('http://localhost:8080/machinevaluedelete', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({timestampDel})
  })
  .then(()=>console.log("success"))
  .catch(error =>console.log(error))

    handleDialog("", false);
  } else {
    handleDialog("", false);
  }
};
  const handleCancel=()=>{
    seteditOrgid(null)
}
    // useEffect(()=>{
    //   let isMounted = true;
    //   const abortCont=new AbortController();
    //   console.log("getCustAction")
      
    //   store.dispatch(getValueAction());
    //   store.subscribe(() => {
    //     const state= store.getState();
    //     if (state.value.status == "waiting") {
    //     isMounted && setvalueOrg("Loading...");
    //     }
    //     if (state.value.status == "received") {
    //      console.log("state.data[0]")
    //      isMounted && setvalueOrg(state.value.data)
    //     }
    //     return()=>{
    //       isMounted = false;
    //       abortCont.abort();
    //     }
    //   }); 
    //  },[])
  const [ShowForm, setShowForm ] = useState(false);
  
  const ShowForms= () => {
    setShowForm(!ShowForm);
    console.log("clicked after ShowForm"+ShowForm)

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
  //  const insertList = (event) => {
  //   event.preventDefault();
  //   Axios.post("http://localhost:8080/orgAdd", {
  //     Oid: Oid,
  //     Oname: Oname,
  //     Address: Address,
  //     // Child: Child,
  //     Contact: Contact,
  //   }).then(() => {
  //     console.log("success");
  //   })
  //   }
   
     const handlebutton=()=>{
 const username= Cookies.get('grafana_user')
 console.log(username)
const teamslist=[];
const teamid='';
const memberslist=[];
fetch('apiurl',{
      'methods':'GET',
      headers:{
        'access-control-allow-origin' : '*',
        'Accept': '*/*',
        'Content-Type':'applications/json, charset=UTF-8',
        'Authorization': 'Basic auth',
      }
    }).then(response => response.json())
    .then(response=>{
      teamslist = response;
     
   })
  
//  fetch('apiurl',{
//       'methods':'GET',
//       headers:{
//         'Accept': '*/*',
//         'Content-Type':'applications/json',
//         'Authorization': 'Basic auth',
//       }
//     }).then(response => response.json())
//     .then(response=>{
//       teamslist = response;
     
//    })
    .catch(error =>console.log(error))
    console.log("teamslist")
    console.log(teamslist)
    teamid = teamslist['teams'][0]['id']
    console.log("teamid")
    console.log(teamid)
  if(teamid){
    fetch('apiurl'+String(teamid)+'/members',{
      'methods':'GET',
      headers:{
        'access-control-allow-origin' : '*',
        'Accept': '*/*',
        'Content-Type':'applications/json, charset=UTF-8',
        'Authorization': 'Basic auth',
      }
    }).then(response => response.json())
    .then(response=>{
      memberslist = response.json()
      // teamslist = response;
     
   })
  }
  console.log("memberslist")
  console.log(memberslist)
  
  memberslist.forEach((item, index)=>{
    console.log(index, item)
    
    // for (member in memberslist){
      if(memberslist[index]['login']==String(username).replace('%40', '@')){
        console.log("found member in memberlist")
      // }
    }
    
  })
}

const [car, setCar] = useState("selectDreamCar");

  const [ferrariContentVisible, setFerrariContentVisible] = useState(false);
  const [benzContentVisible, setBenzContentVisible] = useState(false);
  const [audiContentVisible, setAudiContentVisible] = useState(false);
  const [prodContentVisible, setprodContentVisible] = useState(false);
  const [MachineContentVisible, setMachineContentVisible] = useState(false);
  useEffect(() => {
    car === "ferrari"
      ? setFerrariContentVisible(true)
      : setFerrariContentVisible(false);
    car === "benz" ? setBenzContentVisible(true) : setBenzContentVisible(false);
    car === "audi" ? setAudiContentVisible(true) : setAudiContentVisible(false);
    car === "production" ? setprodContentVisible(true) : setprodContentVisible(false);
    car === "Machine" ? setMachineContentVisible(true) : setMachineContentVisible(false);
  }, [car]);

  const handleOnChange = (e) => {
    setCar(e.target.value);
  };

  // const makeFirstLetterCapital = (str) => {
  //   return str.charAt(0).toUpperCase() + str.slice(1);
  // };

  // const renderResult = () => {
  //   let result;
  //   car === "selectDreamCar"
  //     ? (result = "select your dream car")
  //     : (result = car);
  //   return result;
  // };
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
            {/* Your Amount:{amt} */}
            {/* <Shop AA={AccList}/> */}
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
           <>
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
          </>
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
                <Link to="/prdhome" className="sidebar-nav-link active ">
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
              </>
              } */}
              </li>
            </ul>
          </div>
          {/* end sidebar */}
          {/* main content */}
          <div className="wrapper">
          <h3  style={{textAlign:'center',fontWeight:'bold'}}>
                   Admin Tools
                    </h3>  
            <div className="row">
            <div className="col-12 col-m-12 col-sm-12">
            <div className="card2">
            <div className="card-header">
                    <h3 style={{textAlign: "center",display:"inline-block"}}>
                   Select category
                    </h3>    
                    <select className="select" value={car} aria-label="Default select example"style={{marginLeft:'166px'}} onChange={handleOnChange}>
                    <option selected value="selectDreamCar">---- Select from Below -----</option>
                    <option value="Machine">Machine Name</option>
                    <option value="ferrari">Part number</option>
                    <option value="benz">Reason for Rejection</option>
                    <option value="audi">Setup & Adjustment loss</option>
                    <option value="production">Production loss</option> 
                    </select>       
          {/* <select className='select 'style={{marginLeft:'166px',marginRight:'50px',display:"inline-block"}} value={car} onChange={handleOnChange}> */}
          {/* <option value="selectDreamCar">---- Select -----</option>
          <option value="Machine">Machine Name</option> 
          <option value="ferrari">Part number</option>
          <option value="benz">Reason for Rejection</option>
          <option value="audi">Setup & Adjustment loss</option>
          <option value="production">Production loss</option> 
          </select> */}
           </div>
           </div>
           </div>
            </div>
            {ferrariContentVisible && 
            <>
             <div className="row">
              <div className="col-12 col-m-12 col-sm-12">
                <div className="card2">
                  <div className="card-header">
                    <h3 style={{textAlign: "center"}}>
                   Part Number Table
                      <i className="fas fa-plus"  
                     onClick={ ShowForms }
                      />
                      </h3>
                   </div>
                   <div className="card-content">
                   <form className="data" onSubmit={handleEditFormSubmit}> 
                    <table className="data-table">
                     <thead>
                      <tr>
                          <th>
                          </th>
                       </tr>
                     <tr>
                          <th>Part/Tool Identification</th>
                          <th>Cycle Time</th>
                          <th>Action</th>
                       </tr>
                    </thead>
                    {ShowForm &&(
                        <tr>                
                       <td>
                      <input type="text" name="Part_Tool"style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Part/Tool Identification" required="text" 
                         onChange={handleAddFormChange}
                         />
                       </td>
                        <td>  
                         <input type="text" name="Cycle"style={{backgroundColor:'#E8F0FE'}} 
                         className="form-control" placeholder="Cycle Time" required="text" 
                        onChange={handleAddFormChange}
                        />
									     	</td>
										 <td>
                      <button type="submit" 
                      onClick={handleAddFormSubmit}
                      className="button submit"  style={{marginBottom: "5px",backgroundColor: "#4CAF50",border: "none",color: "white",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"Roboto,sans-serif",borderRadius:"8px"}}
                      >
                        Submit</button>
									  </td>
                    </tr>
                      )}
                        <tbody>
                        { valueOrg && valueOrg.map(article=>
                        (
                          <Fragment>
                            {
                            editOrgid===article[0]?<ListformEditableRow editFormData={editFormData} handleCancel={handleCancel} handleEditFormChange={handleEditFormChange}/>:<Listformtable article={article} handleDelete={handleDelete} handleEditclick={handleEditclick}/>}
                            {dialog.isLoading && (
                              <Dialog
                                onDialog={areUSureDelete}
                                message={dialog.message}
                              />
                            )}
                          </Fragment>
                         ) ) }
                      </tbody>  
                      </table>
                      </form>
                  </div>
                </div>
              </div>
            </div>
            </>}
      {benzContentVisible && 
            <ListForm1/>
                  }
      {audiContentVisible && <ListForm2/>}
      {prodContentVisible && <ListForm3/>}
      {MachineContentVisible && <Machine/> } 
          </div>
  
          </div>
                        )
}
// const mapStateToProps = (state) => ({
//   isAuthenticated: state.auth.isAuthenticated,
//   error: state.error
// });

// export default connect(mapStateToProps)(ListForm);
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps)(Prdhome);