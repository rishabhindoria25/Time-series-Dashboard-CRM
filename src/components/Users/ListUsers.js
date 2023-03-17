import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "../../State/store";
import { getuserAction } from "../../State/Action-creators";
import ListUserstable from "./ListUserstable";
import ListUsersEditableRow from "./ListUsersEditableRow";
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";

function ListUsers({ isAuthenticated, error, clearErrors }) {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  const [valueUser, setvalueUser] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    store.dispatch(loadUser());
    //   // if (error.id === 'LOGIN_FAIL') {
    //   //   setMsg(error.msg.msg);
    //   // } else {
    //   //   setMsg(null);
    //   // }
    if (isAuthenticated) {
      navigate("/user");
    } else {
      navigate("/");
    }
  }, [error, isAuthenticated]);
  const [valuestored1, setvaluestored1] = useState([]);
  console.log(valuestored1.Email);
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
  }, [valueUser]);
  const [editUid, seteditUid] = useState(null);
  const handleEditclick = (event, Users) => {
    event.preventDefault();
    seteditUid(Users.Uid);
    const formValues = {
      Uid: Users.Uid,
      First_name: Users.First_name,
      Last_name: Users.Last_name,
      Email: Users.Email,
      Oid: Users.Oid,
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
    const newEditvalueUser = {
      Uid: editFormData.Uid,
      First_name: editFormData.First_name,
      Last_name: editFormData.Last_name,
      Email: editFormData.Email,
      Oid: editFormData.Oid,
    };
    const newUsers = [...valueUser];
    const index = valueUser.findIndex(
      (Users) => Users.Uid === editFormData.Uid
    );
    newUsers[index] = newEditvalueUser;
    setvalueUser(newUsers);

    Axios.put("http://localhost:8080/updateUser", newEditvalueUser).then(() => {
      console.log("success");
    });
    seteditUid(null);
  };
  const handleDelete = (event, Users) => {
    event.preventDefault();
    const newUsers = [...valueUser];
    const index = valueUser.findIndex(
      (valueUser) => valueUser.Uid === Users.Oid
    );
    newUsers.splice(index, 1);
    const Oid = Users.Oid;
    setvalueUser(newUsers);
    Axios.delete(`http://localhost:8080/userDel/${Oid}`).then((res) =>
      console.log(res)
    );
  };
  const handleCancel = () => {
    seteditUid(null);
  };

  useEffect(() => {
    const abortCont = new AbortController();
    console.log("getCustAction");
    store.dispatch(getuserAction());

    store.subscribe(() => {
      const state = store.getState();
      if (state.user.status == "waiting") {
        setvalueUser("Loading...");
      }
      if (state.user.status == "received") {
        console.log("state.data[0]");
        setvalueUser(state.user.data);
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
          <li className="sidebar-nav-item">
            <Link to="/user" className="sidebar-nav-link active">
              <div>
                <i className="fas fa-user-friends"></i>
              </div>
              <span>User</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="wrapper">
        <div className="row">
          <div className="col-12 col-m-12 col-sm-12">
            <div className="card2">
              <div className="card-header">
                <h3>User Table</h3>
              </div>
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
                        {/* <th><i className="fas fa-plus" onClick={ShowForms} /></th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from(valueUser) &&
                        Array.from(valueUser).map((Users) => (
                          <Fragment>
                            {editUid === Users.Uid ? (
                              <ListUsersEditableRow
                                editFormData={editFormData}
                                handleCancel={handleCancel}
                                handleEditFormChange={handleEditFormChange}
                              />
                            ) : (
                              <ListUserstable
                                Users={Users}
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

export default connect(mapStateToProps)(ListUsers);
