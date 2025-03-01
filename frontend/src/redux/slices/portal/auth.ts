import { LoginResponse } from "@type/Portal";
import createApiSlice from "../config/apiSlice";

const initialLoginResponse: LoginResponse = {
  token: null,
  userType: null,
  profileId: null,
};

const auth = createApiSlice("loginSlice", initialLoginResponse);

export const {
  request: authRequest,
  success: authSuccess,
  reject: authReject,
  reset: authReset,
} = auth.actions;
export default auth.reducer;
