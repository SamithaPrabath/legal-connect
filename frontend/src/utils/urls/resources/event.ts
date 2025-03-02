import { getUrl, mergeUrls } from "../url-config";

export const event_url = getUrl("events");
export const event_timeslot_url = mergeUrls(event_url, "timeslots");