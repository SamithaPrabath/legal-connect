import { eventListReject, eventListRequest, eventListSuccess } from "@redux/slices/event/list";
import { timeslotReject, timeslotRequest, timeslotSuccess } from "@redux/slices/event/timeslots";
import { EventResponse } from "@type/Event";
import Requests from "@utils/Requests";
import { event_url } from "@utils/urls/resources/event";
import { getUrl } from "@utils/urls/url-config";
import { useDispatch } from "react-redux";

export const tempGetAvailableTimeSlots = () => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(timeslotRequest());

    const success = (data: string[]) => {
        dispatch(timeslotSuccess(data))
    }

    const error = (message: string) => {
        dispatch(timeslotReject(message))
    }

    const request = new Requests(getUrl("timeslots"))
    await request.get(success, error);
}

export const tempGetAllEvents = () => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventListRequest());

    const success = (data: EventResponse[]) => {
        dispatch(eventListSuccess(data))
    }

    const error = (message: string) => {
        dispatch(eventListReject(message))
    }

    const request = new Requests(event_url);

    await request.get(success, error);
}