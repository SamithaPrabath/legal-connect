import { ReviewResponse } from "@type/Review";
import createApiSlice from "../config/apiSlice";

const reviewListSlice = createApiSlice<ReviewResponse[]>("reviewList", []);

export const {
  request: reviewListRequest,
  success: reviewListSuccess,
  reject: reviewListReject,
  reset: reviewListReset,
} = reviewListSlice.actions;
export default reviewListSlice.reducer;
