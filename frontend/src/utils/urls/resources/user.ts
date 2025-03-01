import { getUrl, mergeUrls } from "../url-config";

export const user_url = getUrl("user");
export const user_id_url = (profileId: string) => mergeUrls(user_url, profileId)