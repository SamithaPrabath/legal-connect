import { useDispatch } from "react-redux";
import { noteListReject, noteListRequest, noteListSuccess } from "@redux/slices/note/list";
import { NoteResponse } from "@type/Note";
import Requests from "@utils/Requests";
import { note_url } from "@utils/urls/resources/note";

export const tempGetAllNotes = () => async(dispatch:ReturnType<typeof useDispatch>) => {
    dispatch(noteListRequest());

    const success = (data: NoteResponse[]) => {
        dispatch(noteListSuccess(data))
    }

    const error = (message: string) => {
        dispatch(noteListReject(message))
    }

    const request = new Requests(note_url);

    await request.get(success, error);
}