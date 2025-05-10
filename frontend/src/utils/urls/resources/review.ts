import { getUrl, mergeUrls } from "../url-config";

export const review_url = getUrl("review");
export const review_list_url = (profileId: string) => mergeUrls(review_url, profileId);
export const review_summary_url = (profileId: string) => mergeUrls(mergeUrls(review_url, "summary"), profileId);