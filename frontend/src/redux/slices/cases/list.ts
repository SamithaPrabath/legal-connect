import { CaseResponse } from "@type/Case";
import createApiSlice from "../config/apiSlice";

const caseListSlice = createApiSlice<CaseResponse[]>("caseList", []);

export const {
    request: caseListRequest,
    success: caseListSuccess,
    reject: caseListReject,
    reset: caseListReset,
} = caseListSlice.actions;

export default caseListSlice.reducer;