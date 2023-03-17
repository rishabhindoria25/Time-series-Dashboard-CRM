import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux"
// import { selectCurrentToken } from "../State/Reducers/authSlice"
import { connect } from "react-redux";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { store } from "../State/store";
import { loadUser } from "../State/Action-creators";
const RequireAuth = ({ children, isAuthenticated,Roles }) => {
  // console.log("isAuthenticated", Roles);
  // const [isAuth, setisAuth] = useState();
  // store.dispatch(loadUser());
  // console.log(store.getState().auth.isAuthenticated);
  // useEffect(() => {
  //   // store.dispatch(loadUser());
  //   setisAuth(store.getState().auth.isAuthenticated);
  //   console.log(store.getState().auth.is Authenticated);
  // }, [isAuthenticated]);
  // const token = useSelector(selectCurrentToken)
  const location = useLocation();
  console.log("requireAuth...................................");
  // return isAuth ? (
  return isAuthenticated ? (
    <Layout>{children}</Layout>
  ) : (
    // <Layout/>
    <Navigate to="/" state={{ from: location }} replace />
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  // Roles: state.auth.user.Roles,
  error: state.error,
});

export default connect(mapStateToProps)(RequireAuth);
// export default
