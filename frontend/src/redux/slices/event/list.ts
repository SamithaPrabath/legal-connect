import { EventResponse } from "@type/Event";
import createApiSlice from "../config/apiSlice";

const eventListSlice = createApiSlice<EventResponse[]>("eventList", [])

export const { 
    request: eventListRequest,
    success: eventListSuccess,
    reject: eventListReject,
    reset: eventListReset
} = eventListSlice.actions;

export default eventListSlice.reducer;