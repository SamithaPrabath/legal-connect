import { getUrl, mergeUrls } from "../url-config";

export const document_url = getUrl("document");

export const document_byId_url = (id:string) => mergeUrls(document_url, id);

export const documents_byCaseId_url = (caseId: string) => mergeUrls(mergeUrls(document_url, "byCaseId"), caseId)