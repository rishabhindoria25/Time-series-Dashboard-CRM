import React, { useEffect, useState, useRef, useCallback } from "react";
import "./LoginRegister.css";
import loginlogo from "../../static/images/Dash.png";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { isEmail } from "validator";
import { connect } from "react-redux";
import { login } from "../../State/Action-creators/index";
import { clearErrors } from "../../State/Action-creators/index";
import { Alert } from "reactstrap";
import { store } from "../../State/store";
// import {getAuthAction} from './State/Action-creators';
import { loadUser } from "../../State/Action-creators";
import { Audio } from 'react-loader-spinner';
function LoginRegister({ isAuthenticated, error, login, clearErrors }) {
  let navigate = useNavigate();
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [isPending, setIsPending] = useState(false);
  // let yesMom = useCallback(() =>update("username"));
  // const [count, setCount] = useState("");

  useEffect(() => {
    // store.dispatch(loadUser());
    // if (error.id === "LOGIN_FAIL") {
    //   setMsg(error.msg.msg);
    // } else {
    //   setMsg(null);
    // }
    console.log("isAuth form login", isAuthenticated);
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/");
    }
    // }, []);
  }, [error, isAuthenticated]);

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const form = useRef();
  const checkBtn = useRef();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const signUpButton = () => {
    console.log("signup");
    const container = document.getElementById("container_login");
    container.classList.add("right-panel-active");
  };
  const signInButton = () => {
    console.log("removed");
    const container = document.getElementById("container_login");
    container.classList.remove("right-panel-active");
  };
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };
  const register = (e) => {
    e.preventDefault();
    setIsPending(true);
    setMessage("");
    setSuccessful(false);

    if (checkBtn.current.context._errors.length === 0) {
      AuthService.register(usernameReg, passwordReg).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
          setIsPending(false);
        }
      );
    }
  };

  // useEffect(()=>{
  // let isMounted = true;
  // const abortCont=new AbortController();
  // isMounted &&
  // return()=>{
  //   isMounted = false;
  //   abortCont.abort();
  // }
  // },[count])
  const loginUser = (e) => {
    e.preventDefault();
    setIsPending(true);
    const user = { username, password };
   
    console.log(user);
    login(user);
    setIsPending(false);
    // store.dispatch(loadUser());
    // if (isAuthenticated) {
    //   navigate("/home");
    // } else {
    //   navigate("/");
    // }
    //   const num=user.username
    //   console.log("num",num)
    //   const file_name=num+".txt"
    //   console.log("filename",file_name)
    // fetch(file_name)
    // .then(response => response.text())
    // .then(text => console.log(text))
    //   setCount(num);
    //   console.log("count",count)
    //   store.dispatch(loadUser(num));
  };
  // const handleClick = num => {
  //   const file_name=num+".txt"
  //   console.log("filename",file_name)
  // fetch(file_name)
  // .then(response => response.text())
  // .then(text => console.log(text))
  //   setCount(num);
  // };
  return (
    <>
      <div className="org bodyLogin" >
        <img src={loginlogo} alt="orglogo" className="logoorg" />

        <div className="container_login" id="container_login">
          <div className="form-container sign-up-container">
            {/* <form action="#"> */}
            {!successful && (
              <form className="login_form" onSubmit={register} ref={form}>
                <h2 className="login_h2 leftheading">
                  Register your interest
                </h2>
                <div className="social-container">
                  <a href="#" className="social">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </div>
                <span className="login_span">
                  or use your email for registration
                </span>

                <input
                  className="login_input"
                  type="text"
                  placeholder="First Name"
                />
                <input
                  className="login_input"
                  type="text"
                  placeholder="Last Name"
                />
                <input
                  className="login_input"
                  type="text"
                  placeholder="Organization"
                />
                <input
                  className="login_input"
                  type="email"
                  onChange={(e) => {
                    setUsernameReg(e.target.value);
                  }}
                  placeholder="Email"
                  validations={[required, validEmail]}
                />
                <input
                  className="login_input"
                  type="password"
                  onChange={(e) => {
                    setPasswordReg(e.target.value);
                  }}
                  placeholder="Password"
                  validations={[required, vpassword]}
                />
                <button className="login_button">Sign Up</button>
              </form>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </div>
          <div className="form-container sign-in-container">
            <form className="login_form" onSubmit={loginUser} ref={form}>
              <h1 className="login_h1">Sign in</h1>
              <div className="social-container">
                <a href="#" className="social-container">
                  <i className="fab fa-google-plus-g"></i>
                </a>
              </div>
              <span className="login_span">or use your account</span>
              {msg ? <Alert color="danger">{msg}</Alert> : null}
              <input
                className="login_input"
                type="email"
                onChange={(e) => {
                  setusername(e.target.value);
                }}
                // validations={[required]}
                placeholder="Email"
              />
              <input
                className="login_input"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // validations={[required]}
                placeholder="Password"
              />
              <a className="login_a" href="#">
                Forgot your password?
              </a>

             {!isPending && <button className="login_button">
                Sign In
              </button>}
              { isPending && <button className="login_button" disabled>
                Signing In...
              </button>}
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay_login">
              <div className="overlay-panel overlay-left">
                <h1 className="login_h1">Go Back!</h1>
                <p className="login_p">To Sign In</p>
                <button className="ghost" onClick={signInButton}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1 className="login_h1">Not Registered?</h1>
                <button className="ghost" onClick={signUpButton}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error,
});

export default connect(mapStateToProps, { login, clearErrors })(LoginRegister);
