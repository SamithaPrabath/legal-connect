import createApiSlice from "../config/apiSlice";

const noteDeleteSlice = createApiSlice("noteDelete");

export const {
    request: noteDeleteRequest,
    success: noteDeleteSuccess,
    reject: noteDeleteReject,
    reset: noteDeleteReset,
} = noteDeleteSlice.actions;

export default noteDeleteSlice.reducer;