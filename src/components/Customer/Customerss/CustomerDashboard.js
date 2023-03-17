import React from 'react'
import { Link } from 'react-router-dom';
import admin from "../../../static/images/admin.png";
import logo from "../../../static/images/Dash.png";
// import './CustomerDashboard.css'
  
function CustomerDashboard() {
    
      const primaryColor = '#4834d4'
      const warningColor = '#f0932b'
      const successColor = '#6ab04c'
      const dangerColor = '#eb4d4b'
      const themeCookieName = 'theme'
      const themeDark = 'dark'
      const themeLight = 'light'
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
                <img src={logo} alt="logo" className="logo logo-light " />
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
                  <span className="navbar-badge">1</span>
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
            <li className="sidebar-nav-item" >
                <Link to='/customer/home' className="sidebar-nav-link ">
                  <div>
                  <i className="fas fa-house-user"></i>
                  </div>
                  <span>
                    Home
                  </span>
                </Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/customer/department" className="sidebar-nav-link  active">
                  <div>
                  <i className="fas fa-chart-line"></i>
                  </div>
                  <span>Dashboard</span>
                </Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/customer/distributor" className="sidebar-nav-link">
                  <div>
                    <i className="fas fa-boxes" />
                  </div>
                  <span>Distributor</span>
                </Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/customer/customer" className="sidebar-nav-link">
                  <div>
                    <i className="fas fa-people-carry" />
                  </div>
                  <span>Customer</span>
                </Link>
              </li>
              <li className="sidebar-nav-item">
                <Link to="/customer/user" className="sidebar-nav-link">
                  <div>
                  <i className="fas fa-user-friends"></i>
                  </div>
                  <span>User</span>
                </Link>
                </li>
            </ul>
          </div>
          {/* end sidebar */}
          {/* main content */}
          <div className="wrapper">
            <div className="row">
              <div className="col-4 col-m-12 col-sm-12">
                <div className="card2">
                  <div className="card-header">
                    <h3>
                      Dashboards
                      </h3> 
                </div>
                  <div className="card-content">
                  <form className="data"/>
  
                    <table className="data-table">
                     <thead>
                      
                     </thead>
                     <tbody>

          
                    </tbody>
                      </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          </div>

      
    
  )
}

export default CustomerDashboard