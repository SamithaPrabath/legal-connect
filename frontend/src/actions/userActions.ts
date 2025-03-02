import {
  userListReject,
  userListRequest,
  userListSuccess,
} from "@redux/slices/user/list";
import { userReject, userRequest, userSuccess } from "@redux/slices/user/user";
import { UserInfoResponse } from "@type/User";
import Requests from "@utils/Requests";
import { user_list_url, user_url } from "@utils/urls/resources/user";
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

    const request = new Requests(user_url, null, { profileId });
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

    const request = new Requests(user_list_url, null, {
      idList: idList.join(","),
    });

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
