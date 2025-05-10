import {
  reviewCreateReject,
  reviewCreateRequest,
  reviewCreateSuccess,
} from "@redux/slices/review/create";
import {
  reviewListReject,
  reviewListRequest,
  reviewListSuccess,
} from "@redux/slices/review/list";
import {
  reviewSummaryReject,
  reviewSummaryRequest,
  reviewSummarySuccess,
} from "@redux/slices/review/reviewSummary";
import { ReviewResponse, ReviewSummary } from "@type/Review";
import Requests from "@utils/Requests";
import { getUrl } from "@utils/urls/url-config";
import { useDispatch } from "react-redux";

export const tempReviewListAction =
  () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewListRequest());
    const request = new Requests(getUrl("reviewList"));

    const successCallBack = (data: ReviewResponse[]) => {
      dispatch(reviewListSuccess(data));
    };

    const errorCallBack = (message: string) => {
      dispatch(reviewListReject(message));
    };

    await request.get(successCallBack, errorCallBack);
  };

export const tempReviewSummaryAction =
  () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewSummaryRequest());
    const request = new Requests(getUrl("reviewSummary"));

    const successCallback = (data: ReviewSummary) => {
      dispatch(reviewSummarySuccess(data));
    };

    const errorCallback = (message: string) => {
      dispatch(reviewSummaryReject(message));
    };

    await request.get(successCallback, errorCallback);
  };

export const tempReviewAdder =
  (reviewForm: ReviewResponse) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewCreateRequest());
    const request = new Requests(getUrl("reviewList"), reviewForm);

    const successCallback = (data: ReviewResponse) => {
      dispatch(reviewCreateSuccess(data));
    };

    const errorCallback = (message: string) => {
      dispatch(reviewCreateReject(message));
    };

    await request.post(successCallback, errorCallback);
  };
