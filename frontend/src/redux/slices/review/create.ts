import { ReviewResponse } from "@type/Review";
import createApiSlice from "../config/apiSlice";

const reviewCreateSlice = createApiSlice<ReviewResponse>("reviewCreate");

export const {
  request: reviewCreateRequest,
  success: reviewCreateSuccess,
  reject: reviewCreateReject,
  reset: reviewCreateReset,
} = reviewCreateSlice.actions;
export default reviewCreateSlice.reducer;
