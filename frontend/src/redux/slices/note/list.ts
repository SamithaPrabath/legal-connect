import { NoteResponse } from "@type/Note";
import createApiSlice from "../config/apiSlice";

const noteListSlice = createApiSlice<NoteResponse[]>("noteList", []);

export const {
    request: noteListRequest,
    success: noteListSuccess,
    reject: noteListReject,
    reset: noteListReset,
} = noteListSlice.actions;

export default noteListSlice.reducer;