import { UserInfoResponse } from "@type/User";
import createApiSlice from "../config/apiSlice";

const signUpSlice = createApiSlice<UserInfoResponse>("signupSlice");

export const { request: signupRequest, success: signUpSuccess, reject: signUpReject, reset:signUpReset } = signUpSlice.actions;
export default signUpSlice.reducer;