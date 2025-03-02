import { DocumentResponse } from "../../../type/Document";
import createApiSlice from "../config/apiSlice";

const documentListSlice = createApiSlice<DocumentResponse[]>("documentList");

export const {
  request: documentListRequest,
  success: documentListSuccess,
  reject: documentListReject,
  reset: documentListReset,
} = documentListSlice.actions;

export default documentListSlice.reducer;
