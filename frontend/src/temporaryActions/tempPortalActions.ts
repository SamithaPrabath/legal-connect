import { useAppDispatch } from "@redux/hooks";
import { authReject, authRequest, authSuccess } from "@redux/slices/portal/auth";
import { signUpReject, signupRequest, signUpSuccess } from "@redux/slices/portal/signup";
import store from "@redux/store/store";
import { UserInfoResponse } from "@type/User";
import Requests, { getAxiosErrorMessage } from "@utils/Requests";
import { signup_url, token_url } from "@utils/urls/resources/portal";
import axios from "axios";
import { useDispatch } from "react-redux";

export const tempLoginAction = (email: string, password: string) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(authRequest())
    await axios.get(token_url, {params: {
        email, password
    }})
    .then(res => {
        if (res.data?.length === 0) throw new Error("Login unsuccessful!");
        dispatch(authSuccess(res.data[0]))
    })
    .catch(err => {
        dispatch(authReject(getAxiosErrorMessage(err)));
    })
}

export const signupAction = () => async(dispatch: ReturnType<typeof useAppDispatch>, getState:() => ReturnType<typeof store.getState>) => {
    const userForm = getState().user.form
    const request = new Requests(signup_url, userForm);
    dispatch(signupRequest())
    request.post<UserInfoResponse>((data:UserInfoResponse) => dispatch(signUpSuccess(data)), (message) => dispatch(signUpReject(message)));
}