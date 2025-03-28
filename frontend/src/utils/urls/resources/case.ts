import { getUrl, mergeUrls } from "../url-config";

export const case_url = getUrl("cases");
export const case_type_url = mergeUrls(case_url, "case-types")

export const case_byId_url = (caseId: string) => mergeUrls(case_url, caseId);
export const case_byUserId_url = (userId: string) => mergeUrls(mergeUrls(case_url, "listByUser"), userId);      
export const case_pageByLawyerId_url = (userId: string) => mergeUrls(mergeUrls(case_url, "page"), userId);