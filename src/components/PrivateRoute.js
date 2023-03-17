// import { useSelector } from 'react-redux';
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { Navigate, Route, useLocation } from 'react-router-dom';
const PrivateRoute = ({ children, isAuthenticated,Roles }) => {
    console.log("isAuthenticated", Roles);
    console.log("isAuthenticated", isAuthenticated);

    const location = useLocation();
//    const priveteroute=Roles
//    const new_role=false
//    if (priveteroute='Admin'){
//     new_role=true
//    }
//    console.log("New_role",new_role)

if (Roles=='Admin') {
     return (
        <Layout>{children}</Layout>
      ) 
}  
if(Roles=='Customer'){
return (
    <Layout>{children}</Layout>
  ) 
//   : (
//     // <Layout/>
//     <Navigate to="/" state={{ from: location }} replace />
//   );
}else{
    return (
        // <Layout/>
        <Navigate to="/" state={{ from: location }} replace />
      );
}
    // return new_role ? (
    //     <Layout>{children}</Layout>
    //   ) : (
    //     // <Layout/>
    //     <Navigate to="/" state={{ from: location }} replace />
    //   );
// const PrivateRoute = ({
//   children,
//   roles,
// }) => {
//   let location = useLocation();
//   const { isAuthenticated, user, loading } = useSelector(state => state.auth);

//   if (loading) {
//     return <p className="container">Checking auth..</p>;
//   }

//   const userHasRequiredRole = user && roles.includes(user.role) ? true : false;

//   if (!isAuthenticated) {
//     return <Navigate to="/login" state={{ from: location }} />;
//   }

//   if (isAuthenticated && !userHasRequiredRole) {
//     return <AccessDenied />; // build your won access denied page (sth like 404)
//   }

//   return children;
// };
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  Roles: state.auth.user.Roles,
  error: state.error,
});

export default connect(mapStateToProps)(PrivateRoute);