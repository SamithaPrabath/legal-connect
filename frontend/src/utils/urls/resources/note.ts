import { getUrl, mergeUrls } from "../url-config";

export const note_url = getUrl("notes")
export const note_byId_url = (noteId: string) => mergeUrls(note_url, noteId);