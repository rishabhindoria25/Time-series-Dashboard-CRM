import React, { useState, useEffect, Fragment } from "react";
import admin from "../../static/images/admin.png";
import logo from "../../static/images/Dash.png";
import APIService from "../APIService";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { store } from "../../State/store";
import { getValueAction } from "../../State/Action-creators";
import ListformEditableRow from "./ListformEditableRow";
import Listformtable from "./Listformtable";
import { connect } from "react-redux";
import { loadUser } from "../../State/Action-creators";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../State/Action-creators";

function ListForm({ isAuthenticated, error, clearErrors }) {
  const dispatch = useDispatch();
  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);
  let navigate = useNavigate();
  const [Msg, setMsg] = useState();
  useEffect(() => {
    let isMounted = true;
    // const abortCont = new AbortController();
    // isMounted &&
    store.dispatch(loadUser());
    // if (error.id === "LOGIN_FAIL") {
    //   isMounted && setMsg(error.msg.msg);
    // } else {
    //   isMounted && setMsg(null);
    // }
    if (isAuthenticated) {
      navigate("/organization");
    } else {
      navigate("/");
    }
    // return () => {
    //   isMounted = false;
    //   abortCont.abort();
    // };
  }, [error, isAuthenticated]);
  const [showResults, setShowResults] = useState(false)
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
    fetch(
      "http://localhost:8080/UsersRole",
      {
        methods: "GET",
        headers: {
          "Content-Type": "applications/json",
          "x-access-token": localStorage.getItem("token"),
        },
      },
      {
        signal: abortCont.signal,
      }
    )
      .then((response) => response.json())
      .then((response) => isMounted && setvaluestored1(response))
      // .then(res=>setvaluestoredRole(res[0].Role.toUpperCase()))
      .catch((error) => console.log(error));
    return () => {
      isMounted = false;
      abortCont.abort();
    };
  }, []);
  const [valueOrg, setvalueOrg] = useState([]);
  const [AddvalueOrg, setAddvalueOrg] = useState({
    Oid: "",
    Oname: "",
    Address: "",
    Contact: "",
  });
  const [editOrgid, seteditOrgid] = useState(null);
  const handleEditclick = (event, article) => {
    event.preventDefault();
    seteditOrgid(article.Oid);
    const formValues = {
      Oid: article.Oid,
      Oname: article.Oname,
      Address: article.Address,
      Contact: article.Contact,
    };
    seteditFormData(formValues);
  };
  const [editFormData, seteditFormData] = useState({
    Oid: "",
    Oname: "",
    Address: "",
    Child: "",
    Contact: "",
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
      Oid: editFormData.Oid,
      Oname: editFormData.Oname,
      Address: editFormData.Address,
      Child: editFormData.Child,
      Contact: editFormData.Contact,
    };
    const newarticle = [...valueOrg];
    const index = valueOrg.findIndex(
      (article) => article.Oid === editFormData.Oid
    );
    newarticle[index] = newEditvalueOrg;
    setvalueOrg(newarticle);
    seteditOrgid(null);
    Axios.put("http://localhost:8080/update", newEditvalueOrg).then(() => {
      console.log("success");
    });
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
      Oid: AddvalueOrg.Oid,
      Oname: AddvalueOrg.Oname,
      Address: AddvalueOrg.Address,
      Contact: AddvalueOrg.Contact,
    };
    const newvalueOrgs = [...valueOrg, newvalueOrg];
    setvalueOrg(newvalueOrgs);
    console.log(newvalueOrgs);
    Axios.post("http://localhost:8080/orgAdd", newvalueOrg).then(() => {
      console.log("success");
    });

    ShowForms();
  };
  const handleDelete = (event, article) => {
    event.preventDefault();
    const newarticle = [...valueOrg];
    const index = valueOrg.findIndex(
      (valueOrg) => valueOrg.Oid === article.Oid
    );
    const Oid = article.Oid;

    console.log(Oid);
    newarticle.splice(index, 1);
    setvalueOrg(newarticle);
    Axios.delete(`http://localhost:8080/orgDel/${Oid}`).then((res) =>
      console.log(res)
    );
  };
  const handleCancel = () => {
    seteditOrgid(null);
  };
  useEffect(() => {
    let isMounted = true;
    const abortCont = new AbortController();
    console.log("getCustAction");

    store.dispatch(getValueAction());
    store.subscribe(() => {
      const state = store.getState();
      if (state.value.status == "waiting") {
        isMounted && setvalueOrg("Loading...");
      }
      if (state.value.status == "received") {
        console.log("state.data[0]");
        isMounted && setvalueOrg(state.value.data);
      }
      return () => {
        isMounted = false;
        abortCont.abort();
      };
    });
  }, []);
  const [ShowForm, setShowForm] = useState(false);
  const [editForm, seteditForm] = useState(false);

  const ShowForms = () => {
    setShowForm(!ShowForm);
    console.log("clicked after ShowForm" + ShowForm);
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
        {/* Your Amount:{amt} */}
        {/* <Shop AA={AccList}/> */}
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
            <Link to="/organization" className="sidebar-nav-link active">
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
      <h3 style={{textAlign:'center',fontWeight:'bold'}}> Organizations </h3>
        <div className="row">
          <div className="col-12 col-m-12 col-sm-12">
            <div className="card2">
              <div className="card-content">
                <form className="data" onSubmit={handleEditFormSubmit}>
                  {/* <form className="data"/> */}

                  <table className="data-table">
                    <thead>
                      <tr>
                        {/* <th>Oid</th> */}
                        <th>Organization</th>
                        <th>Address</th>
                        <th>Contact</th>
                        <th>Action</th>
                        <th><i className="fas fa-plus" onClick={ShowForms} /></th>
                      </tr>
                      {/* </tbody> */}
                    </thead>
                    {ShowForm && (
                      // <form
                      // onSubmit={handleAddFormSubmit}
                      // >
                      //  <table className="data-table">
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="Oid"
                            style={{ backgroundColor: "#E8F0FE" }}
                            // value={Oid}
                            className="form-control"
                            placeholder="Oid"
                            required="text"
                            //  onChange={(e)=>setOid(e.target.value)}
                            onChange={handleAddFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="Oname"
                            style={{ backgroundColor: "#E8F0FE" }}
                            // value={Oname}
                            className="form-control"
                            placeholder="Oname"
                            required="text"
                            //  onChange={(e)=>setOname(e.target.value)}
                            onChange={handleAddFormChange}
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="Address"
                            style={{ backgroundColor: "#E8F0FE" }}
                            //  value={Address}
                            className="form-control"
                            placeholder="Address"
                            required="text"
                            //  onChange={(e)=>setAddress(e.target.value)}
                            onChange={handleAddFormChange}
                          />
                        </td>
                        {/* <td>
                      <input type="text" name="Child" 
                       value={Child} 
                       className="form-control" placeholder="Child"required="text" 
                      onChange={(e)=>setChild(e.target.value)}
                      />
                     </td> */}
                        <td>
                          <input
                            type="text"
                            name="Contact"
                            style={{ backgroundColor: "#E8F0FE" }}
                            //  value={Contact}
                            className="form-control"
                            placeholder="Contact"
                            required="text"
                            onChange={handleAddFormChange}
                            //  onChange={(e)=>setContact(e.target.value)}
                          />
                        </td>
                        <td>
                        <i class="far fa-save fa-2x" onClick={handleAddFormSubmit} type="submit" style={{marginBottom: "5px",marginRight:"20px"}}></i>
                          {/* <button
                            type="submit"
                            // onClick={insertList}
                            onClick={handleAddFormSubmit}
                            // class="save-btn"
                            className="button submit"
                            style={{
                              marginBottom: "5px",
                              backgroundColor: "#4CAF50",
                              border: "none",
                              color: "white",
                              textAlign: "center",
                              textDecoration: " none",
                              display: "inline-block",
                              fontSize: "18px",
                              padding: "4px 12px 4px 12px",
                              fontFamily: "Roboto,sans-serif",
                              borderRadius: "8px",
                            }}
                          >
                            Submit
                          </button> */}
                        </td>
                        {/* // </table> */}
                        {/* //  </form> */}
                      </tr>
                    )}
                    {/* {
                     editForm 
                     && 
                      (
                       <tr>
                        <td>  
                         <input type="text" name="Oid"
                          value={newOid} 
                         className="form-control" placeholder="Oid"required="number" 
                         onChange={(e)=>setnewOid(e.target.value)}
                         />
									     	</td>
									    	 <td>
                          <input type="text" name="Oname"
                           value={newOname} 
                           className="form-control" placeholder="Oname"required="text" 
                           onChange={(e)=>setnewOname(e.target.value)}
                           />
									   	</td>
                     <td>
                      <input type="text" name="Address"  
                      value={newAddress} 
                      className="form-control" placeholder="Address"required="text" 
                      onChange={(e)=>setnewAddress(e.target.value)}
                      />
                     </td>
                      <td>
                       <input type="text" name="Contact"  
                       value={newContact} 
                       className="form-control" placeholder="Contact"required="text" 
                       onChange={(e)=>setnewContact(e.target.value)}
                       />
                         </td>
										 <td>
                     <button type="submit" 
                      onClick={updateList} 
                      // class="save-btn"
                      className="button submit" style={{backgroundColor: "#4CAF50",border: "none",color: "white",padding:" 15px 32px",textAlign: "center",textDecoration:" none",display: "inline-block",fontSize: "18px",padding:"4px 12px 4px 12px",fontFamily:"'Roboto',sans-serif",borderRadius:"8px"}}
                      >
                        Update</button>
									 </td>
                    </tr>
                        )  }  
                       */}

                    <tbody>
                      {Array.from(valueOrg) &&
                        Array.from(valueOrg).map((article) => (
                          <Fragment>
                            {editOrgid === article.Oid ? (
                              <ListformEditableRow
                                editFormData={editFormData}
                                handleCancel={handleCancel}
                                handleEditFormChange={handleEditFormChange}
                              />
                            ) : (
                              <Listformtable
                                article={article}
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

export default connect(mapStateToProps)(ListForm);
