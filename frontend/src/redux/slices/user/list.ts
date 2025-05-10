import { UserInfoResponse } from "@type/User";
import createApiSlice from "../config/apiSlice";

const userListSlice = createApiSlice<UserInfoResponse[]>("userList",[]);

export const {
    request: userListRequest,
    success: userListSuccess,
    reject: userListReject,
    reset: userListReset
} = userListSlice.actions;

export default userListSlice.reducer;