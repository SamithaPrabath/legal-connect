import caseReducer from "@redux/slices/cases/reducer";
import portal from "@redux/slices/portal/reducer";
import review from "@redux/slices/review/reducer";
import user from "@redux/slices/user/reducer";
import { combineReducers } from "@reduxjs/toolkit";

const reducer = combineReducers({
    user,
    portal,
    case: caseReducer,
    review,
})

export default reducer;