import { DocumentResponse } from "@type/Document";
import createApiSlice from "../config/apiSlice";

const documentUploadSlice = createApiSlice<DocumentResponse>("documentUpload");

export const {
  request: documentUploadRequest,
  success: documentUploadSuccess,
  reject: documentUploadReject,
  reset: documentUploadReset,
} = documentUploadSlice.actions;

export default documentUploadSlice.reducer;
