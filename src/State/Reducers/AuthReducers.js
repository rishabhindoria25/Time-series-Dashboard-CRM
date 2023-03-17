import {
  // USER_LOADED,
  // USER_LOADING,
  AUTH_ERROR,
  // LOGIN_SUCCESS,
  // LOGIN_FAIL,
  // LOGOUT_SUCCESS,
  // REGISTER_SUCCESS,
  // REGISTER_FAIL,
} from "../Action-creators/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: true,
  isLoading: false,
  //   user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        // user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
