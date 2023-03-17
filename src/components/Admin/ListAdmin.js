import React, { Fragment } from "react";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import { Link } from "react-router-dom";
// import './ListAdmin.css'
import Axios from "axios";
// import APIService from "../APIService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { store } from "../../State/store";
import { getadminAction } from "../../State/Action-creators";
import { useSelector } from "react-redux";
import { getAuthAction } from "../../State/Action-creators";
import { getUserRole } from "../../State/Action-creators";
import CircularJSON from "circular-json";
import ListAdminEditableRow from "./ListAdminEditableRow";
import ListAdmintable from "./ListAdmintable";
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";
import SettingsModal from "./SettingsModal";
import Modal from "./Modal";

function ListAdmin({ isAuthenticated, error, clearErrors }) {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  let navigate = useNavigate();
  useEffect(() => {
    store.dispatch(loadUser());
    // Check for register error
    // if (error.id === 'LOGIN_FAIL') {
    //   setMsg(error.msg.msg);
    // } else {
    //   setMsg(null);
    // }

    if (isAuthenticated) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [error, isAuthenticated]);
  const [isOpen, setIsOpen] = useState(false);
  function handleOpen() {
    setIsOpen(true);
    console.log("clicked")
  }

  function handleClose() {
    setIsOpen(false);
  }
const [showResults, setShowResults] = useState(true)
const onClickdrop = () => {
  setShowResults(!showResults)
}
const [showResults1, setShowResults1] = useState(false)
  const onClickdrops = () => {
    setShowResults1(!showResults1)
  }
  const [valuestored1, setvaluestored1] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const abortCont = new AbortController();
    fetch("http://localhost:8080/UsersRole", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
      signal: abortCont.signal,
    })
      .then((response) => response.json())
      .then((response) => isMounted && setvaluestored1(response))
      .catch((error) => console.log(error));
    return () => {
      isMounted = false;
      abortCont.abort();
    };
  }, []);
  const [valueAdmin, setvalueAdmin] = useState([]);
  const [editUid, seteditUid] = useState(null);
  const handleEditclick = (event, Admin) => {
    event.preventDefault();
    seteditUid(Admin.Uid);
    const formValues = {
      Uid: Admin.Uid,
      First_name: Admin.First_name,
      Last_name: Admin.Last_name,
      Email: Admin.Email,
      Oid: Admin.Oid,
    };
    seteditFormData(formValues);
  };
  const [editFormData, seteditFormData] = useState({
    Uid: "",
    First_name: "",
    Last_name: "",
    Email: "",
    Oid: "",
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
    const newEditvalueAdmin = {
      Uid: editFormData.Uid,
      First_name: editFormData.First_name,
      Last_name: editFormData.Last_name,
      Email: editFormData.Email,
      Oid: editFormData.Oid,
    };
    const newAdmin = [...valueAdmin];
    const index = valueAdmin.findIndex(
      (Admin) => Admin.Uid === editFormData.Uid
    );
    newAdmin[index] = newEditvalueAdmin;
    setvalueAdmin(newAdmin);

    Axios.put("http://localhost:8080/updateAdmin", newEditvalueAdmin).then(
      () => {
        console.log("success");
      }
    );
    seteditUid(null);
  };
  const handleDelete = (event, Admin) => {
    event.preventDefault();
    const newAdmin = [...valueAdmin];
    const index = valueAdmin.findIndex(
      (valueAdmin) => valueAdmin.Uid === Admin.Oid
    );
    newAdmin.splice(index, 1);
    const Oid = Admin.Oid;
    setvalueAdmin(newAdmin);
    fetch(`http://localhost:8080/api/AdminDel/${Oid}`, {
      methods: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const handleCancel = () => {
    seteditUid(null);
  };
  useEffect(() => {
    const abortCont = new AbortController();
    console.log("getCustAction");

    store.dispatch(getadminAction());
    store.subscribe(() => {
      const state = store.getState();
      if (state.admin.status == "waiting") {
        setvalueAdmin("Loading...");
      }
      if (state.admin.status == "received") {
        setvalueAdmin(state.admin.data);
      }
      return () => {
        abortCont.abort();
      };
    });
  }, []);

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
                    {/* <span>Profile</span> */}
                  </div>
                </li>
                <li className="dropdown-menu-item">
                  <Link to="#" className="dropdown-menu-link">
                    <div>
                      <i className="fas fa-cog" />
                    </div>
                    <span  onClick={handleOpen}>Settings</span>
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
            <Link to="/home" className="sidebar-nav-link ">
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
           <>
           <li className="sidebar-nav-item">
            <Link to="/admin" className="sidebar-nav-link active">
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
          <Link to="/production" className="sidebar-nav-link ">
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
      {isOpen && (
          <SettingsModal/>
          // <Modal/>
            )}
      <div className="wrapper">
      <h3 style={{textAlign:'center',fontWeight:'bold'}}> Admins</h3>
        <div className="row">
      
          <div className="col-12 col-m-12 col-sm-12">
         
            <div className="card2">
              <div className="card-content">
                <form className="data" onSubmit={handleEditFormSubmit}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        {/* <th>Uid</th> */}
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        {/* <th>Oid</th> */}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(valueAdmin) &&
                        Array.from(valueAdmin).map((Admin) => (
                          <Fragment>
                            {editUid === Admin.Uid ? (
                              <ListAdminEditableRow
                                editFormData={editFormData}
                                handleCancel={handleCancel}
                                handleEditFormChange={handleEditFormChange}
                              />
                            ) : (
                              <ListAdmintable
                                Admin={Admin}
                                handleDelete={handleDelete}
                                handleEditclick={handleEditclick}
                              />
                            )}
                          </Fragment>
                        ))}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps)(ListAdmin);
