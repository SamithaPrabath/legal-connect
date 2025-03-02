import createApiSlice from "../config/apiSlice";

const timeslotsSlice = createApiSlice<string[]>("timeslots", []);

export const {
    request: timeslotRequest,
    success: timeslotSuccess,
    reject: timeslotReject,
    reset: timeslotReset,
} = timeslotsSlice.actions;

export default timeslotsSlice.reducer;