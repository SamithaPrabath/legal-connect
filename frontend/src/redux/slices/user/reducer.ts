import { combineReducers } from "@reduxjs/toolkit";
import form from "./form";
import userReducer from "./user";
import list from "./list";

const user = combineReducers({
    form,
    list,
    user: userReducer
})

export default user;