import { combineReducers } from "redux";
import * as HandleException from "./HandleException";

let reducer = combineReducers(Object.assign(HandleException));
export default reducer;
