import { combineReducers } from "@reduxjs/toolkit";
import caseTypes from "./caseTypes";
import page from "./page";
import list from "./list";
import caseRecducer from "./case";

const caseReducer = combineReducers({
    caseTypes,
    page,
    list,
    case: caseRecducer,
})

export default caseReducer;