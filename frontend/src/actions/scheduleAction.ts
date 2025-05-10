import { eventsByDateReject, eventsByDateRequest, eventsByDateSuccess } from "@redux/slices/event/byDate";
import { EventResponse } from "@type/Event";
import Requests from "@utils/Requests";
import { events_bydate_url } from "@utils/urls/resources/event";
import { useDispatch } from "react-redux";

export const getScheduleByDate = (profileId: string, date: string) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventsByDateRequest());

    const success = (data: EventResponse[]) => {
        dispatch(eventsByDateSuccess(data))
    }

    const error = (message: string) => {
        dispatch(eventsByDateReject(message));
    }

    const request = new Requests(events_bydate_url, null, {lawyerId: profileId, date});
    await request.get(success, error);
}