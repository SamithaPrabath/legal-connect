import { TimeLineEvent } from "@type/Event";
import createApiSlice from "../config/apiSlice";

const timeLineEventsSlice = createApiSlice<TimeLineEvent[]>(
  "timeLineEventList",
  []
);

export const {
  request: timeLineEventRequest,
  success: timeLineEventSuccess,
  reject: timeLineEventReject,
  reset: timeLineEventReset,
} = timeLineEventsSlice.actions;

export default timeLineEventsSlice.reducer;
