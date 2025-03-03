import { getUrl, mergeUrls } from "../url-config";

export const payment_url = getUrl("payments");
export const payment_byId_url = (paymentId: string) => mergeUrls(payment_url, paymentId)
export const payment_download_url = (paymentId: string) => mergeUrls(mergeUrls(payment_url, "download"), paymentId)