import axios from "axios";
import { Navigate } from "react-router-dom";
// import { useState } from "react";
// const [usernameReg, setUsernameReg] = useState('');
// const [passwordReg, setPasswordReg] = useState('');
// const API_URL = "http://localhost:8080/api/auth/";

const register = (usernameReg, passwordReg) => {
  return axios
    .post("http://localhost:8080/register", {
      username: usernameReg,
      password: passwordReg,
    })
    .then((response) => {
      console.log(response);
    });
};
const login = (username, password) => {
  return axios
    .post("http://localhost:8080/loginUser", {
      username: username,
      password: password,
    })
    .then((response) => {
      // if (response.data.token) {
      //     localStorage.setItem("token",response.data.token);
      //   }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("token");
};

const userAuthenticated = () => {
  return axios
    .get("http://localhost:8080/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
    .then((response) => {
      console.log(response.data.auth);
      return response;
    });
};

const AuthService = {
  register,
  login,
  logout,
  userAuthenticated,
  //   getCurrentUser,
};

export default AuthService;
