import React from "react";
import { Link } from "react-router-dom";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import "./ListDashboard.css";
import Tree from "./Tree";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../State/store";
import CustomLoader from "../CustomLoader"
import { getQuoteAction } from "../../State/Action-creators";
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";
import { Alert } from "reactstrap";
import {
  AUTH_ERROR,
  LOGOUT_SUCCESS,
  USER_LOADED,
} from "../../State/Action-creators/types";
import OrgTreeComponent, { useTree } from 'react-drag-hierarchy-tree';
// import { logout } from "../../State/Action-creators";
// import AuthService from "../Services/AuthService";

// import {getAuthAction} from './State/Action-creators';
// import { loadUser } from "../../State/Action-creators";

// import { logout } from "./actions/auth";

function ListDashboard({ isAuthenticated, error, clearErrors }) {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  let navigate = useNavigate();
  const [Msg, setMsg] = useState();
  const data = {
    id: 1,
    label: "Test",
    children: [
      {
        id: 2,
        label: "Test1",
        children: [
          {
            id: 3,
            label: "Test2",
            children: [],
          },
        ],
      },
      {
        id: 4,
        label: "Test3",
        children: [
          {
            id: 5,
            label: "Test4",
            children: [],
          },
        ],
      },
    ],
  }
  console.log("isAuthenticated from ListDashboard ", isAuthenticated);
  console.log("data from that",data)
  const { treeRef } = useTree();

  const onClick = () => {
    treeRef.current?.onExpandNodes();
  };
  useEffect(() => {
    store.dispatch(loadUser());
    // // if (error.id === "LOGIN_FAIL") {
    // //   setMsg(error.msg.msg);
    // // } else {
    // //   setMsg(null);
    // // }

    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [error, isAuthenticated]);
  // const Logout = () => {
  //   store.dispatch(logout());
  // };
  // const logOut = useCallback(() => {
  //   store.dispatch(logout());
  // }, [store.dispatch]);
  // const logOut = store.dispatch(logout());
  // useEffect(() => {
  //   // store.dispatch(loadUser());
  //   console.log("loadUser inside list dashboard");
  //   // if (error.id === "LOGIN_FAIL") {
  //   //   setMsg(error.msg.msg);
  //   // } else {
  //   //   setMsg(null);
  //   // }
  //   if (isAuthenticated) {
  //     navigate("/home");
  //   } else {
  //     navigate("/");
  //   }
  //   // });
  // }, [error, isAuthenticated]);
  const [showResults, setShowResults] = useState(false)
const onClickdrop = () => {
  setShowResults(!showResults)
}
const [showResults1, setShowResults1] = useState(false)
  const onClickdrops = () => {
    setShowResults1(!showResults1)
  }
  const [valuestored1, setvaluestored1] = useState([]);
  const [isloading,setisloading] = useState(false);
  useEffect(() => {
    const abortCont = new AbortController();
    fetch("http://localhost:8080/UsersRole", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((response) => setvaluestored1(response))
      .catch((error) => console.log(error));
    return () => {
      abortCont.abort();
    };
  }, []);
  const [valuestored, setvaluestored] = useState([]);
  useEffect(() => {
    const abortCont = new AbortController();
    console.log("getQuoteAction");
    store.dispatch(getQuoteAction());
    store.subscribe(() => {
      const state = store.getState();
      if (state.amount.status == "waiting") {
        setisloading(true)
      }
      if (state.amount.status == "received") {
        console.log("Flat");
        console.log(state.amount.data);
        setisloading(false)
        setvaluestored(state.amount.data);
      }
    });
    return () => {
      abortCont.abort();
    };
    
  }, []);
  console.log("Rvorg",valuestored)
  function collapseSidebar() {
    const Body = document.getElementById("body");
    Body.classList.toggle("sidebar-expand");
  }
  window.onclick = function (event) {
    openCloseDropdown(event);
  };

  function closeAllDropdown() {
    var dropdowns = document.getElementsByClassName("dropdown-expand");
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].classList.remove("dropdown-expand");
    }
  }

function openCloseDropdown(event) {
    if (!event.target.matches(".dropdown-toggle")) {
      closeAllDropdown();
    } else {
      var toggle = event.target.dataset.toggle;
      var content = document.getElementById(toggle);
      if (content.classList.contains("dropdown-expand")) {
        closeAllDropdown();
      } else {
        closeAllDropdown();
        content.classList.add("dropdown-expand");
      }
    }
  }
  const treeData =valuestored;
  //       console.log(typeof(valuestored))
  // console.log(typeof(AccList))
  console.log("valuestored")
  console.log(valuestored)
  
  // console.log("newObj",newobj)
  function unflatten(values) {
    var childs = {};
    var roots = [];

    values.forEach(function (node) {
      childs[node.Child] = node; //save into a hash
      node.children = []; //make sure it has a children array
      //save it as root if it is a root
      if (node.Parent === null) {
        roots.push(node);
      }
    });
    values.forEach(function (node) {
      //if it has a parent, add self to parent's children
      var parent = childs[node.Parent];
      if (parent) parent.children.push(node);
    });
    return roots;
  }

  //  console.log(roots)
  // const S=valuestored
  // function unflatten(valuestored) {
  //   var childs = {};
  //   var roots = [];

  //   valuestored.forEach(function(node){

  //   childs[node.Child] = node;       //save into a hash
  //   node.children = [];            //make sure it has a children array
  // //save it as root if it is a root
  //   if(node.Parent === null){ roots.push(node);}
  //   });
  //     valuestored.forEach(function(node){
  // //if it has a parent, add self to parent's children
  //   var parent = childs[node.Parent];
  //   if(parent)
  //     parent.children.push(node);
  //   });

  //   return roots;
  // }

  // const parentnode={parent}
  // const treeData=
  // valuestored
  // //     //  AccList
  // //   // console.log(treeData)
  //   function unflatten(valuestored) {
  //     var childs = {};
  //     var roots = [];

  //     valuestored.forEach(function(node){

  //     childs[node.Child] = node;       //save into a hash
  //     node.children = [];            //make sure it has a children array
  // //save it as root if it is a root
  //     if(node.Parent === null){ roots.push(node);}
  //     });

  //     treeData.forEach(function(node){
  // //if it has a parent, add self to parent's children
  //     var parent = childs[node.Parent];
  //     if(parent)  parent.children.push(node);
  //     });

  //     return roots;
  // }
  // const root=
  // // // valuestored
  // // // // treeData
  // unflatten(valuestored);
  // const r=root
  // // console.log(root)
  // console.log("r")
  // console.log(r)

  const r = unflatten(treeData);

  console.log("rrrr",r)
  // const [r, setr] = useState(unflatten(treeData));
  //  console.log("R: "+CircularJSON.stringify(r));
  //  useEffect(() => {
  //   setr(JSON.parse(window.sessionStorage.getItem("r")));
  // }, []);
  // setr(JSON.parse)
  // useEffect(() => {
  //   window.sessionStorage.setItem("r", CircularJSON.stringify(r));
  // }, [r]);
  // console.log("value for tree chart",r[0])
  // const task=r[0]
  // console.log("task",task)
  // Object.keys(task).forEach(function(key, index) {
  //   task[key] *= 2;
  // });
  const loadedtasks=[]; 
  const task=r[0]
  console.log("task",task)
  
  // const add=[]
  var myObj  = {};

  //  myObj['x'] = 12;
// console.log(myObj.x);  -->> prints 12
  for (var key in task) {
    // console.log(key)
    const value1=['id','label','children']
    const entries = new Map([
      [value1[key]],
      [task[key]]
    ]);
    console.log("Key",[value1[key]])
    console.log("values",[task[key]])
    myObj = Object.fromEntries(entries);
  //  myObj[value1[key]]=task[key]
    // for (var i in value1){
    //   add.push(i)
    // }
    // console.log("KEYS from ",value1)
    // Object.keys(value1)
    // Object.values(task[key])
    // console.log("from object",loadedtasks.push(task[key]))
      // console.log(i)
  // }
 }
console.log("OBJ",myObj)
    // loadedtasks.push(Object.values(task));

  // 
  // for(const Child in task){
  //   // console.log(taskKey.Child)
  //   // console.log("TASK",task)
  //   console.log(Object.values(task));
  //   loadedtasks.push(Object.values(task));
  //     // ,text:r[taskKey].children});
  // }
  console.log("loaded tasks before",data)
  console.log("loadedtasks",loadedtasks)

  return (
    
  //  {isloading ?
  //   <>
  //   <CustomLoader
  //   > 
  //   </>
  //   :
    <div className="overlay-scrollbar" id="body">
      <div className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div className="nav-link">
              <i
                className="fas fa-bars"
                onClick={({ target }) => collapseSidebar(target)}
              />
            </div>
          </li>
          <li className="nav-item">
            <img src={logo} alt="logo" className="logo logo-light " />
          </li>
        </ul>
        {/* end nav left */}
        {/* form */}

        <form className="navbar-search">
          <input
            type="text"
            name="Search"
            className="navbar-search-input"
            placeholder="What you looking for..."
          />
          <i className="fas fa-search" />
        </form>
        <ul className="navbar-nav nav-right">
          <div className="nav-link">
            <span>
              Welcome ! {valuestored1.map((Role) => Role.Role.toLowerCase())}
              {/* <Alert>{Msg}</Alert> */}
            </span>
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
                    <span>{valuestored1.map((name) => name.First_name)}</span>
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
            <Link to="/home" className="sidebar-nav-link active">
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
      <h3 style={{textAlign:'center',fontWeight:'bold'}}>List Of All Accessable Organizations</h3>
        <div className="row">
          <div className="col-12 col-m-12 col-sm-12">
            {/* <div className="card2"> */}
              {/* <div className="card-header"> */}
              {/* </div> */}
              {/* <div className="card-content"> */}
                {/* <form className="data" /> */}
                <div  style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}} >
                  {/* <div className="col text-center">
                    <div className="mt-3">
                      <div className="row mt-3 d-flex justify-content-center">
                        <div className="col-lg-8 text-left text-dark"> */}
                        {/* <div> */}
                        {/* <button onClick={onClick}>close/open</button> */}
                        <OrgTreeComponent cardStyle={{backgroundColor:'#254E80',color:'#fff'}} data={data} ref={treeRef}    
                        // horizontal 
                        vertical/>
    {/* </div> */}
                          {/* <Tree data={r}  /> */}
                        {/* </div>
                      </div>
                    </div>
                  </div> */}
                {/* </div> */}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    //   )
    //   : (
    //     <h4 className="mb-3 ml-4">Please log in</h4>
    // )}
    // </>
  // }  
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});
// const mapDispatchToProps = (dispatch) => ({
//   actions : bindActionCreators(actionCreators, dispatch)
// });

export default connect(mapStateToProps)(ListDashboard);
// export default ListDashboard
