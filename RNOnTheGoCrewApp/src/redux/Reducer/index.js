import { combineReducers } from "redux";
import * as HandleException from "./HandleException";
import * as User from "./User";
import * as Order from "./Order";

const reducer = combineReducers(Object.assign(HandleException, User, Order));
export default reducer;
