const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const getUrl = (resourceName: string) => baseUrl + resourceName;
export const mergeUrls = (parentUrl: string, childUrl: string) => `${parentUrl}/${childUrl}`;