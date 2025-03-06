import { getUrl, mergeUrls } from "../url-config";

export const user_url = getUrl("user");
export const user_id_url = (profileId: string) => mergeUrls(user_url, profileId)
export const user_list_url = mergeUrls(user_url, "list");

export const find_lawyer_url = mergeUrls(user_url, "findLawyer");

export const verify_lawyer_url = (id:string) => mergeUrls(mergeUrls(user_url, "verify"), id);
export const deny_lawyer_url = (id: string) => mergeUrls(mergeUrls(user_url, "deny"), id);  