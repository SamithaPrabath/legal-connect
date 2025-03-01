import createApiSlice from "../config/apiSlice";

const caseTypeSlice = createApiSlice<string[]>("caseType", []);

export const {
  request: caseTypesRequest,
  success: caseTypesSuccess,
  reject: caseTypesReject,
  reset: caseTypesReset,
} = caseTypeSlice.actions;
export default caseTypeSlice.reducer;
