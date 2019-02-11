import { combineReducers } from "redux";
import * as HandleException from "./HandleException";

const reducer = combineReducers(Object.assign(HandleException));
export default reducer;
