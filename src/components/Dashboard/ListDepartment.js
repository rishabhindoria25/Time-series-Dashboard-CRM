import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { store } from "../../State/store";
import { useNavigate } from "react-router-dom";
import { getDashName } from "../../State/Action-creators";
import { getDashboardorg } from "../../State/Action-creators";
import DashboardEditableRow from "./DashboardEditableRow";
import Dashboardtable from "./Dashboardtable";
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";

function ListDepartment({ isAuthenticated, error, clearErrors }) {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  let navigate = useNavigate();
  useEffect(() => {
    store.dispatch(loadUser());

    // if (error.id === 'LOGIN_FAIL') {
    //   setMsg(error.msg.msg);
    // } else {
    //   setMsg(null);
    // }
    if (isAuthenticated) {
      navigate("/department");
    } else {
      navigate("/");
    }
  }, [error, isAuthenticated]);
  const [showResults, setShowResults] = useState(false)
  const onClickdrop = () => {
    setShowResults(!showResults)
  }
  const [showResults1, setShowResults1] = useState(false)
  const onClickdrops = () => {
    setShowResults1(!showResults1)
  }
  const [ShowForm, setShowForm] = useState(false);
  const [SDashName, setSDashName] = useState([]);
  const [SDashorg , setSDashorg] = useState([]);
  console.log("Sdashorg",SDashorg)

  const ShowForms = () => {
    setShowForm(!ShowForm);
  };
  const [valuestored1, setvaluestored1] = useState([]);
  const [AddvalueOrg, setAddvalueOrg] = useState({
    Dname: "",
  });

  const [editOrgid, seteditOrgid] = useState(null);
  const handleEditclick = (event, dash) => {
    event.preventDefault();
    seteditOrgid(dash.Did);
    const formValues = {
      Dname: dash.Dname,
    };
    seteditFormData(formValues);
  };
  const [editFormData, seteditFormData] = useState({
    Dname: "",
  });
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newEditFormData = { ...editFormData };
    newEditFormData[fieldName] = fieldValue;
    seteditFormData(newEditFormData);
  };
  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    const newEditvalueOrg = {
      Dname: editFormData.Dname,
      Oid: SDashName[0].Oid,
      Uid: SDashName[0].Uid,
      Did: 1006,
    };
    const newdash = [...SDashName];
    const index = SDashName.findIndex((dash) => dash.Uid === editFormData.Uid);
    newdash[index] = newEditvalueOrg;
    setSDashName(newdash);

    axios
      .put("http://localhost:8080/dashboardUpdate", newEditvalueOrg)
      .then(() => {
        console.log("success");
      });
    seteditOrgid(null);
  };
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...AddvalueOrg };
    newFormData[fieldName] = fieldValue;
    setAddvalueOrg(newFormData);
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newvalueOrg = {
      Dname: AddvalueOrg.Dname,
      Oid: SDashName[0].Oid,
      Uid: SDashName[0].Uid,
      Did: 1006,
    };
    const newvalueOrgs = [...SDashName, newvalueOrg];
    setSDashName(newvalueOrgs);
    axios.post("http://localhost:8080/DashAdd", newvalueOrg).then(() => {
      console.log("Dashboard Addition success");
    });
    ShowForms();
  };
  const handleDelete = (event, dash) => {
    event.preventDefault();
    const newdash = [...SDashName];
    const index = SDashName.findIndex(
      (SDashName) => SDashName.Did === dash.Did
    );
    const Did = dash.Did;

    console.log(Did);
    newdash.splice(index, 1);
    setSDashName(newdash);
    axios
      .delete(`http://localhost:8080/dashboardDel/${Did}`)
      .then((res) => console.log(res));
  };
  const handleCancel = () => {
    seteditOrgid(null);
  };

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
  
  // useEffect(() => {
  //   const abortCont = new AbortController();
  //   store.dispatch(getDashName());
  //   store.subscribe(() => {
  //     const state = store.getState();
  //     if (state.DashName.status == "waiting") {
  //       setSDashName("Loading...");
  //     }
  //     if (state.DashName.status == "received") {
  //       console.log("state.data[0]");
  //       //  console.log(state.DashName.data)
  //       setSDashName(state.DashName.data);
  //     }
  //     return () => {
  //       abortCont.abort();
  //     };
  //   });
  // }, []);
  useEffect(() => {
    const abortCont = new AbortController();
    store.dispatch(getDashboardorg());
    store.subscribe(() => {
      const state = store.getState();
      if (state.DashName.status == "waiting") {
                setSDashName("Loading...");
      }
      if (state.DashName.status == "received") {
        console.log("state.data[0]");
        setSDashName(state.DashName.data);

      }
      return () => {
        abortCont.abort();
      };
    });
  }, []);
console.log("SDASHNAME",SDashName)
  const [state, setstate] = useState({ data: "" });
  const [Name, setName] = useState("");
  const [Label, setLabel] = useState("");
  const Cancel = () => {
    setShowForm(!ShowForm);
  };

  const changeState = (event) => {
    event.preventDefault();
    setstate({ data: Name + " " + Label });
  };
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
      //
      // Close dropdown when click out of dropdown menu
      //
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

  return (
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
            <img src={logo} alt="logo" className="logo logo-light" />
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
            <span>{valuestored1.map((Role) => Role.Role.toUpperCase())}</span>
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
      <h3 style={{textAlign:'center',fontWeight:'bold'}}> Organization with Dashboards</h3>
                         <div className="row">
                         {Array.from(SDashName) &&
                      Array.from(SDashName).map((dash) => ( <div className="col-4 col-m-12 col-sm-12">
            <div className="card2">
              <div className="card-header">
                <h3>
                 {dash.Oname} Table
                  <i className="fas fa-plus" onClick={ShowForms} />
                </h3>
              </div>
              <form className="data" onSubmit={handleEditFormSubmit}>
                <table className="data-table">
                  <thead>
                    
                    {/* {Array.from(SDashName) &&
                      Array.from(SDashName).map((dash) => ( */}
                        <Fragment>
                          {editOrgid === dash.Did ? (
                            <DashboardEditableRow
                              editFormData={editFormData}
                              handleCancel={handleCancel}
                              handleEditFormChange={handleEditFormChange}
                            />
                          ) : (
                            <Dashboardtable
                              dash={dash}
                              handleDelete={handleDelete}
                              handleEditclick={handleEditclick}
                              handleAddFormSubmit={handleAddFormSubmit}
                              />
                          )}
                        </Fragment>
                     
                  </thead>
                  <tbody>
                    {/* {ShowForm && (
                      <>
                        <td>
                          <input
                            type="text"
                            name="Dname"
                            className="form-control"
                            placeholder="Dashboard Name"
                            required="text"
                            onChange={handleAddFormChange}
                          />
                        </td>

                        <td>
                          <button
                            type="submit"
                            onClick={handleAddFormSubmit}
                            className="button submit"
                            style={{
                              marginBottom: "5px",
                              marginRight: "3px",
                              backgroundColor: "#4CAF50",
                              border: "none",
                              color: "white",
                              padding: " 15px 32px",
                              textAlign: "center",
                              textDecoration: " none",
                              display: "inline-block",
                              fontSize: "18px",
                              padding: "4px 12px 4px 12px",
                              fontFamily: "'Roboto',sans-serif",
                              borderRadius: "8px",
                            }}
                          >
                            Submit
                          </button>
                          <button
                            type="cancel"
                            className="button cancel"
                            style={{
                              backgroundColor: "#f44336",
                              border: "none",
                              color: "white",
                              padding: " 15px 32px",
                              textAlign: "center",
                              textDecoration: " none",
                              display: "inline-block",
                              fontSize: "18px",
                              padding: "4px 12px 4px 12px",
                              fontFamily: "'Roboto',sans-serif",
                              borderRadius: "8px",
                            }}
                            onClick={Cancel}
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    )} */}
                  </tbody>
                </table>
              </form>
            </div>
          </div> ))}
        </div>
       
      </div>
      
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps)(ListDepartment);
