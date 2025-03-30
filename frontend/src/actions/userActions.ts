import {
  userListReject,
  userListRequest,
  userListSuccess,
} from "@redux/slices/user/list";
import {
  userPageReject,
  userPageRequest,
  userPageSuccess,
} from "@redux/slices/user/page";
import { userReject, userRequest, userSuccess } from "@redux/slices/user/user";
import { PageType } from "@type/Page";
import { UserInfoResponse } from "@type/User";
import Requests from "@utils/Requests";
import {
  find_lawyer_url,
  user_id_url,
  user_list_url,
  user_page_url,
  user_url,
} from "@utils/urls/resources/user";
import { useDispatch } from "react-redux";

export const getUserByProfileId =
  (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userRequest());

    const successCallBack = (data: UserInfoResponse) => {
      dispatch(userSuccess(data));
    };

    const errorCallBack = (err: string) => {
      dispatch(userReject(err));
    };

    const request = new Requests(user_id_url(profileId));
    await request.get(successCallBack, errorCallBack);
  };

export const userListByIdsAction =
  (idList: string[]) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userListRequest());

    const successCallback = (data: UserInfoResponse[]) => {
      dispatch(userListSuccess(data));
    };

    const errorCallback = (err: string) => {
      dispatch(userListReject(err));
    };

    const queryString = idList.map(id => `idList=${id}`).join("&");

    const request = new Requests(`${user_list_url}?${queryString}`);

    await request.get(successCallback, errorCallback);
  };

export const userSearchAction =
  (name: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userListRequest());

    const successCallback = (data: UserInfoResponse[]) => {
      dispatch(userListSuccess(data));
    };

    const errorCallback = (err: string) => {
      dispatch(userListReject(err));
    };

    const request = new Requests(user_url, null, { firstName: name });

    await request.get(successCallback, errorCallback);
  };

export const findLawyerAction =
  (caseType: string, language: string, location: string, sortBy: string) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userListRequest());

    const successCallback = (data: UserInfoResponse[]) => {
      dispatch(userListSuccess(data));
    };

    const errorCallback = (err: string) => {
      dispatch(userListReject(err));
    };

    const request = new Requests(find_lawyer_url, null, {
      caseType,
      language,
      location,
      sortBy,
    });

    await request.get(successCallback, errorCallback);
  };

export const lawyerPageAction =
  (key: string, page: number, pageSize: number) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userPageRequest());

    const success = (data: PageType<UserInfoResponse>) => {
      dispatch(userPageSuccess(data));
    };

    const error = (message: string) => {
      dispatch(userPageReject(message));
    };

    const request = new Requests(user_page_url, null, {
      key,
      page,
      pageSize,
    });
    await request.get(success, error);
  };
