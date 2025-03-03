import caseReducer from "@redux/slices/cases/reducer";
import event from "@redux/slices/event/reducer";
import portal from "@redux/slices/portal/reducer";
import review from "@redux/slices/review/reducer";
import user from "@redux/slices/user/reducer";
import { combineReducers } from "@reduxjs/toolkit";
import document from "@redux/slices/document/reducer";
import note from "@redux/slices/note/reducer";

const reducer = combineReducers({
    user,
    portal,
    case: caseReducer,
    review,
    event,
    document,
    note,
})

export default reducer;