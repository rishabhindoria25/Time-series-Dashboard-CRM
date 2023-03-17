import { combineReducers } from "redux";
import adminreducer from "./AdminReducers";
// import amountReducer from "./amountReducers";
import Quotareducer from "./amountReducers";
// import authreducers from "./AuthReducers";
import custreducer from "./CustReducers";
import distreducer from "./DistReducers";
import userreducer from "./UserReducers";
import valuereducer from "./ValueReducers";
import loginReducers from "./loginReducers";
import rolereducer from "./UsersRole";
import DashNameReducer from "./DashNameReducers";
import errorReducer from "./errorReducer";
import AuthReducer from "./AuthReducer";
import DashNameorgReducer from "./orgdashboardReducer";
import prdReducer from "./prdReducers";

const reducers = combineReducers({
  // amount:amountReducer
  amount: Quotareducer,
  value: valuereducer,
  admin: adminreducer,
  dist: distreducer,
  cust: custreducer,
  user: userreducer,
  // Auth: authreducers,
  login: loginReducers,
  Role: rolereducer,
  DashName: DashNameReducer,
  error: errorReducer,
  auth:AuthReducer,
  Dashorg:DashNameorgReducer,
  production:prdReducer
});
export default reducers;
