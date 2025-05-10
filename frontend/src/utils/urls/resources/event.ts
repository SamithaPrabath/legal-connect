import { getUrl, mergeUrls } from "../url-config";

export const event_url = getUrl("events");
export const event_timeslot_url = mergeUrls(event_url, "timeslots");
export const events_bydate_url = mergeUrls(event_url, "byDate");

export const events_list_byProfileId = (profileId: string) => mergeUrls(mergeUrls(event_url, "byUser"), profileId);
export const events_list_byCaseId = (caseId: string) => mergeUrls(mergeUrls(event_url, "byCase"), caseId);
