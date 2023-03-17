import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import thunk from "redux-thunk";
import reducers from "./Reducers";

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);
// import { configureStore } from "@reduxjs/toolkit"
// import { apiSlice } from "../State/Action-creators/apiSlice"
// import authReducer from '../State/Reducers/authSlice'

// export const store = configureStore({
//     reducer: {
//         [apiSlice.reducerPath]: apiSlice.reducer,
//         auth: authReducer,
//         // reducers,
//     },
//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware()
//         .concat(apiSlice.middleware),
//     devTools: true
// })
