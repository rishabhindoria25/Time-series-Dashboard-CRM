// export const depositMoney=(amount)=>{
//     return(dispatch)=>{
//         dispatch({
//             type:'deposit',
//             payload:amount
//         })
//     }

// }

import axios from "axios";
// const fs = require('fs')

import { GET_ERRORS, CLEAR_ERRORS } from "./types";

// import { returnErrors } from './errorActions';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from "./types";
// let USER="";
// import { IAuthFunction, IConfigHeaders } from '../../types/interfaces';

// Check token & load user

// import { GET_ERRORS, CLEAR_ERRORS } from './types';
// import { IMsg } from '../../types/interfaces';
// export const tokenConfig = (getState) => {
// export const tokenConfig = () => {
//   // Get token from localstorage
//   const token = localStorage.getItem("token");
//   // USER
//   // const token = getState().user;
//   // getState().auth.token;

//   // Headers
//   const config = {
//     headers: {
//       "Content-type": "applications/json",
//     },
//   };

//   // If token, add to headers
//   if (token) {
//     config.headers["x-access-token"] = token;

//     // config.headers['x-auth-token'] = USER;
//   }

//   return config;
// };
// export const tokenConfig = (getState) => {
export const tokenConfig = () => {
  // Get token from localstorage
  // const token = getState().auth.token;
  const token = localStorage.getItem("token");

  // Headers
  const config = {
    headers: {
      "Content-type": "applications/json",
    },
  };

  // If token, add to headers
  if (token) {
    config.headers["x-auth-token"] = token;
  } else {
  }

  return config;
};
// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id },
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// Login User
export const login =
  ({ username, password }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ username, password });
    console.log(body);
    axios
      .post("http://localhost:8080/loginUser", body, config)
      .then((res) =>
        dispatch({
          type: LOGIN_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({
          type: LOGIN_FAIL,
        });
      });
  };
// export const logout = () => (dispatch) => {
//   dispatch({
//     type: LOGOUT_SUCCESS,
//   });
// };
// export const login = ({ username, password }) => (
//   dispatch
// ) => {
//   // Headers
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   };
// export const loadUser = (count) => (dispatch) => {
//   // User loading
//   dispatch({ type: USER_LOADING });
//   const body =count.split(":");

//   axios
//     .post('http://localhost:8080/isUserAuth', body)
//     .then(res =>

//       dispatch({
//         type: USER_LOADED,
//         payload: res.data
//       }))

//     // ).then(response=> console.log(response))
//     .catch(err => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR
//       });
//       console.log(err)
//     });
// };
// export const loadUser = () => (dispatch) => {
//   // User loading
//   dispatch({ type: USER_LOADING });
//   // const body =count.split(":");

//   axios
//     .post("http://localhost:8080/isUserAuth", {
//       headers: {
//         "Content-Type": "applications/json",
//         "x-access-token": localStorage.getItem("token"),
//       },
//     })
//     .then((res) =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       })
//     )

//     // ).then(response=> console.log(response))
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR,
//       });
//       console.log(err);
//     });
// };

// export const UserAuth = () => (dispatch) => {
//   // User loading
//   dispatch({ type: USER_LOADING });
//   // const body =count.split(":");

//   axios
//     .post(
//       "http://localhost:8080/isUserAuth",
//       {
//         headers: {
//           "Content-Type": "applications/json",
//           "x-access-token": localStorage.getItem("token"),
//         },
//       }
//       // body
//     )
//     .then((res) =>
//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       })
//     )

//     // ).then(response=> console.log(response))
//     .catch((err) => {
//       dispatch(returnErrors(err.response.data, err.response.status));
//       dispatch({
//         type: AUTH_ERROR,
//       });
//       console.log(err);
//     });
// };
// export const logout = () => (dispatch) => {
//   // AuthService.logout();

//   dispatch({
//     type: AUTH_ERROR,
//   });
//   // localStorage.removeItem("token");
// };
export const loadUser = () => (dispatch) => {
  // export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({ type: USER_LOADING });
  const config = {
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
  };
  axios
    .get("http://localhost:8080/isUserAuth", config)
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.res.data, err.res.status));
      dispatch({
        type: AUTH_ERROR,
      });
      console.log(err);
    });
};
// Setup config/headers and token

const QUOTE_REQUESTED = "QUOTE_REQUESTED";
const QUOTE_RECEIVED = "QUOTE_RECEIVED";
const QUOTE_FAILED = "QUOTE_FAILED";

export function getQuoteAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    //   axios.post(`http://localhost:8080/AccOrg/${Uoid}`,
    // )
    // .then(res => console.log(res))
    fetch(`http://localhost:8080/AccOrg`, {
      methods: "POST",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}

export function getCustAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/CustList", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        // 'x-access-token':localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getValueAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/value", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getadminAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/AdminList", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        // 'x-access-token':localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getdistAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/DistList", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        // 'x-access-token':localStorage.getItem('token')
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getuserAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/UsersList", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getAuthAction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/isUserAuth", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      // axios
      //   .get("http://localhost:8080/isUserAuth", {
      //     headers: {
      //       "x-access-token": localStorage.getItem("token"),
      //     },
      //   })
      // .then(response =>console.log(response))
      // .then(response => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload:
            // data.map(role=>role.data)
            [data],
          //  data.map(d=>d.data)
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function postloginAction(username, password) {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    axios
      .post("http://localhost:8080/loginUser", {
        username: username,
        password: password,
      })
      //  .then(response=>console.log(typeof(response)))
      // .then(response => response.json())
      .then((response) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: [response.data.token],
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function logout () {
  return function (dispatch) {
  localStorage.removeItem("token");
  dispatch({
    type: LOGOUT_SUCCESS,
  });
}
};
export function getUserRole() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/UsersRole", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data.map((role) => role.First_name),
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getDashName() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/Dash", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getDashboardorg() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/Dashorg", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
export function getproduction() {
  return function (dispatch) {
    dispatch({
      type: QUOTE_REQUESTED,
    });
    fetch("http://localhost:8080/prdall", {
      methods: "GET",
      headers: {
        "Content-Type": "applications/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) =>
        dispatch({
          type: QUOTE_RECEIVED,
          payload: data,
        })
      )
      .catch((error) =>
        dispatch({
          type: QUOTE_FAILED,
          payload: error,
        })
      );
  };
}
