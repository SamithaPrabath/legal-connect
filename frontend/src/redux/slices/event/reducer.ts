import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import timeslots from "./timeslots";
import byDate from "./byDate";
import list from "./list";

const event = combineReducers({
    create,
    timeslots,
    byDate,
    list,
})

export default event;