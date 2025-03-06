import { PageType } from "@type/Page";
import { UserInfoResponse } from "@type/User";
import createApiSlice from "../config/apiSlice";

const userPageSlice = createApiSlice<PageType<UserInfoResponse>>("userPage", {
  data: [],
  totalCount: 0,
});

export const {
  request: userPageRequest,
  success: userPageSuccess,
  reject: userPageReject,
} = userPageSlice.actions;

export default userPageSlice.reducer;
