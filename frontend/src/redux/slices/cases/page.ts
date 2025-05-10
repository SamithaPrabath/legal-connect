import { PageType } from "@type/Page";
import createApiSlice from "../config/apiSlice";
import { CaseResponse } from "@type/Case";

const casePageSlice = createApiSlice<PageType<CaseResponse>>("casePage", {data: [], totalCount: 0});

export const {
    request: casePageRequest,
    success: casePageSuccess,
    reject: casePageReject,
    reset: casePageReset,
} = casePageSlice.actions;

export default casePageSlice.reducer;