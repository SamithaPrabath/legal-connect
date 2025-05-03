import { getUrl, mergeUrls } from "../url-config";

const timeline_event_url = getUrl("timeline-event");
export const timeline_events_byCaseId_url = (caseId: string) => mergeUrls(timeline_event_url, caseId);
