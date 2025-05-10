import { EventResponse } from "@type/Event";
import createApiSlice from "../config/apiSlice";

const eventCreateSlice = createApiSlice<EventResponse>("eventCreate");

export const {
  request: eventCreateRequest,
  success: eventCreateSuccess,
  reject: eventCreateReject,
  reset: eventCreateReset,
} = eventCreateSlice.actions;

export default eventCreateSlice.reducer;
