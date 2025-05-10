import { combineReducers } from "@reduxjs/toolkit";
import list from "./list";
import deleteReducer from "./delete";

const note = combineReducers({
    list,
    delete: deleteReducer
});

export default note;