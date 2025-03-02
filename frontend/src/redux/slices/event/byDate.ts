import { EventResponse } from "@type/Event";
import createApiSlice from "../config/apiSlice";

const eventsByDateSlice = createApiSlice<EventResponse[]>(
  "scheduleByDate",
  []
);

export const {
  request: eventsByDateRequest,
  success: eventsByDateSuccess,
  reject: eventsByDateReject,
  reset: eventsByDateReset,
} = eventsByDateSlice.actions;

export default eventsByDateSlice.reducer;
