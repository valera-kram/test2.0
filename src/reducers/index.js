import { combineReducers } from "redux";
import sessionReducer from "./sessionReducer";
import profile from "./profileReducer";
import error from "./errorReducer";

export default combineReducers({
  authorization: sessionReducer,
  profile,
  error,
});
