import { combineReducers } from "@reduxjs/toolkit";
import create from "./create";
import timeslots from "./timeslots";

const event = combineReducers({
    create,
    timeslots
})

export default event;