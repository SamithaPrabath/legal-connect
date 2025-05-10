import { combineReducers } from "@reduxjs/toolkit";
import form from "./form";
import userReducer from "./user";
import list from "./list";
import page from "./page";

const user = combineReducers({
    form,
    list,
    page,
    user: userReducer
})

export default user;