import { combineReducers } from "@reduxjs/toolkit";
import form from "./form";
import userReducer from "./user";

const user = combineReducers({
    form,
    user: userReducer
})

export default user;