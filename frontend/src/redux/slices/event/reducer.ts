import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import timeslots from "./timeslots";
import byDate from "./byDate";
import list from "./list";
import timelineList from "./timelineEvents"

const event = combineReducers({
    create,
    timeslots,
    byDate,
    list,
    timelineList,
})

export default event;