import { useDispatch } from "react-redux";
import { noteListReject, noteListRequest, noteListSuccess } from "@redux/slices/note/list";
import { NoteRequest, NoteResponse } from "@type/Note";
import Requests from "@utils/Requests";
import { note_byId_url, note_url } from "@utils/urls/resources/note";
import { noteDeleteReject, noteDeleteRequest, noteDeleteSuccess } from "@redux/slices/note/delete";

export const noteListAction = (userId: string, caseId: string) => async(dispatch:ReturnType<typeof useDispatch>) => {
    dispatch(noteListRequest());

    const success = (data: NoteResponse[]) => {
        dispatch(noteListSuccess(data))
    }

    const error = (message: string) => {
        dispatch(noteListReject(message))
    }

    const request = new Requests(note_url, null, {userId, caseId});

    await request.get(success, error);
}

export const noteCreateAction = async(note: NoteRequest) => {
    const request = new Requests(note_url, note);
    await request.post();
}

export const noteDeleteAction = (noteId: string) => async(dispatch:ReturnType<typeof useDispatch>) => {

    dispatch(noteDeleteRequest())

    const successCallback = () => {
        dispatch(noteDeleteSuccess(null))
    }

    const errorCallbakc = (message: string) => {
        dispatch(noteDeleteReject(message));
    }

    const request = new Requests(note_byId_url(noteId));
    await request.delete(successCallback, errorCallbakc);
}