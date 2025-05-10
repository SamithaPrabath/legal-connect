import { UserInfoResponse } from "@type/User";
import createApiSlice from "../config/apiSlice";

const userSlice = createApiSlice<UserInfoResponse>("user");

export const { request: userRequest, success: userSuccess, reject: userReject, reset: userReset} = userSlice.actions;
export default userSlice.reducer;