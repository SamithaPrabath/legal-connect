import { CaseResponse } from "@type/Case";
import createApiSlice from "../config/apiSlice";

const caseSlice = createApiSlice<CaseResponse>("case");

export const {
    request: singleCaseRequest,
    success: singleCaseSuccess,
    reject: singleCaseReject,
    reset: singhleCaseReset
} = caseSlice.actions;

export default caseSlice.reducer;