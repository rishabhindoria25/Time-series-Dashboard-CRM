// const reducer=(state=initialState,action)=>{
//     if(action.type=='deposit'){
//         return action.payload
//     }
//     else if(action.type=='withdraw'){
//         return state - action.payload
//     }
//     else{
//         return state;
//     }
//   }
const QUOTE_REQUESTED = "QUOTE_REQUESTED";
const QUOTE_RECEIVED = "QUOTE_RECEIVED";
const QUOTE_FAILED = "QUOTE_FAILED";
// import{QUOTE_REQUESTED,QUOTE_FAILED,QUOTE_RECEIVED} from "../Action-creators"
  const initialState = { data: [], status:"" };
  // const initialCustState = { data: [], status:"" };

export default function Quotareducer(state = initialState, action) {
  switch (action.type) {
    case QUOTE_REQUESTED:
      state = Object.assign({}, state, {status: "waiting"});
      break;
    case QUOTE_RECEIVED:
      state = Object.assign({}, state, {data: [...action.payload], status: "received"});
      break;
    case QUOTE_FAILED:
      state = Object.assign({}, state, {status: "failed", error: action.payload});
      break;
  }
  
  return state;
}
// export function custreducer(state = initialCustState, action) {
//     switch (action.type) {
//       case QUOTE_REQUESTED:
//         state = Object.assign({}, state, {status: "waiting"});
//         break;
//       case QUOTE_RECEIVED:
//         state = Object.assign({}, state, {data: [...action.payload], status: "received"});
//         break;
//       case QUOTE_FAILED:
//         state = Object.assign({}, state, {status: "failed", error: action.payload});
//         break;
//     }
    
//     return state;
//   }
// import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS ,FETCH_USERS_FAILURE } from "../Action-creators"
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case FETCH_USERS_REQUEST:
//             return{
//                 ...state,
//                 loading:true
//             }
//         case FETCH_USERS_SUCCESS:
//                 return{
//                     loading:false,
//                     users:action.payload,
//                     error:''
//                 }
//         case FETCH_USERS_FAILURE:
//                     return{
//                         loading:false,
//                         users:[],
//                         error:action.payload
//                     }
//     }
// }

// const initialState=[]
// {
    // "hello"
   
    // loading:false,
    // users:[],
    // error:''

// }

  // export default {
  //   custreducer,
  //   Quotareducer
  // };