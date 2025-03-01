import { userReject, userRequest, userSuccess } from "@redux/slices/user/user";
import { UserInfoResponse } from "@type/User";
import Requests from "@utils/Requests";
import { user_url } from "@utils/urls/resources/user";
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
