import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import signup from "./signup";

const portal = combineReducers({
    auth,
    signup,
})

export default portal;