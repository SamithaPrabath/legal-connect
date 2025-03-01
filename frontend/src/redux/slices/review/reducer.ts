import { combineReducers } from "@reduxjs/toolkit";
import summary from "./reviewSummary"
import list from "./list";
import create from "./create";

const review = combineReducers({
    summary,
    list,
    create
})

export default review;