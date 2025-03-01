import { ReviewSummary } from "@type/Review";
import createApiSlice from "../config/apiSlice";

const reviewSummarySlice = createApiSlice<ReviewSummary>("reviewSummary");

export const {
  request: reviewSummaryRequest,
  success: reviewSummarySuccess,
  reject: reviewSummaryReject,
  reset: reviewSummaryReset,
} = reviewSummarySlice.actions;

export default reviewSummarySlice.reducer;
