import { getUrl, mergeUrls } from "../url-config";

const portal_url = getUrl("portal")
export const token_url = mergeUrls(portal_url,"token");
export const signup_url = mergeUrls(portal_url, "signup");