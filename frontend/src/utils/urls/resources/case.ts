import { getUrl, mergeUrls } from "../url-config";

export const case_url = getUrl("cases");
export const case_type_url = mergeUrls(case_url, "case-types")