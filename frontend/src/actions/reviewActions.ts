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
import { ReviewRequest, ReviewResponse, ReviewSummary } from "@type/Review";
import Requests from "@utils/Requests";
import {
  review_list_url,
  review_summary_url,
  review_url,
} from "@utils/urls/resources/review";
import { useDispatch } from "react-redux";

export const reviewListAction =
  (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewListRequest());
    const request = new Requests(review_list_url(profileId));

    const successCallBack = (data: ReviewResponse[]) => {
      dispatch(reviewListSuccess(data));
    };

    const errorCallBack = (message: string) => {
      dispatch(reviewListReject(message));
    };

    await request.get(successCallBack, errorCallBack);
  };

export const reviewSummaryAction =
  (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewSummaryRequest());
    const request = new Requests(review_summary_url(profileId));

    const successCallback = (data: ReviewSummary) => {
      dispatch(reviewSummarySuccess(data));
    };

    const errorCallback = (message: string) => {
      dispatch(reviewSummaryReject(message));
    };

    await request.get(successCallback, errorCallback);
  };

export const addReviewAction =
  (review: ReviewRequest) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(reviewCreateRequest());

    const request = new Requests(review_url, review);

    const successCallBack = (data: ReviewResponse) => {
      dispatch(reviewCreateSuccess(data));
    };

    const errorCallBack = (message: string) => {
      dispatch(reviewCreateReject(message));
    };

    await request.post(successCallBack, errorCallBack);
  };
