import { userReject, userRequest, userSuccess } from "@redux/slices/user/user";
import { UserInfoResponse } from "@type/User";
import Requests from "@utils/Requests";
import { user_id_url } from "@utils/urls/resources/user";
import { useDispatch } from "react-redux";

export const tempGetUserByProfileId =
  (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(userRequest());

    const successCallBack = (data: UserInfoResponse) => {
      dispatch(userSuccess(data));
    };

    const errorCallBack = (err: string) => {
      dispatch(userReject(err));
    };

    const request = new Requests(user_id_url(profileId), null);
    await request.get(successCallBack, errorCallBack);
  };
