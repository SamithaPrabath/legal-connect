import { useAppDispatch } from "@redux/hooks";
import {
  authReject,
  authRequest,
  authSuccess,
} from "@redux/slices/portal/auth";
import {
  signUpReject,
  signupRequest,
  signUpSuccess,
} from "@redux/slices/portal/signup";
import store from "@redux/store/store";
import { UserInfoResponse } from "@type/User";
import Requests, { getAxiosErrorMessage } from "@utils/Requests";
import { token_url } from "@utils/urls/resources/portal";
import { user_id_url, user_url } from "@utils/urls/resources/user";
import axios from "axios";
import { useDispatch } from "react-redux";

export const loginAction =
  (email: string, password: string) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(authRequest());
    await axios
      .post(token_url, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(authSuccess(res.data));
      })
      .catch((err) => {
        dispatch(authReject(getAxiosErrorMessage(err)));
      });
  };

export const signupAction =
  () =>
  async (
    dispatch: ReturnType<typeof useAppDispatch>,
    getState: () => ReturnType<typeof store.getState>
  ) => {
    const userForm = getState().user.form;
    const request = new Requests(user_url, userForm);
    dispatch(signupRequest());
    await request.post<UserInfoResponse>(
      (data: UserInfoResponse) => dispatch(signUpSuccess(data)),
      (message) => dispatch(signUpReject(message))
    );
  };

export const updateUserAction =
  (id: string) =>
  async (
    dispatch: ReturnType<typeof useDispatch>,
    getState: () => ReturnType<typeof store.getState>
  ) => {
    const userForm = getState().user.form;
    const request = new Requests(user_id_url(id), userForm);
    dispatch(signupRequest());
    await request.put(
      (data: UserInfoResponse) => dispatch(signUpSuccess(data)),
      (message) => dispatch(signUpReject(message))
    );
  };
