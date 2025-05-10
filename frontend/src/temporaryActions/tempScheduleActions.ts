import {
  eventsByDateReject,
  eventsByDateRequest,
  eventsByDateSuccess,
} from "@redux/slices/event/byDate";
import { EventResponse } from "@type/Event";
import Requests from "@utils/Requests";
import { event_url } from "@utils/urls/resources/event";
import { useDispatch } from "react-redux";

export const tempGetScheduleByDate =
  (date: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(eventsByDateRequest());

    const success = (data: EventResponse[]) => {
      dispatch(eventsByDateSuccess(data));
    };

    const error = (message: string) => {
      dispatch(eventsByDateReject(message));
    };

    const request = new Requests(event_url, null, {date});
    await request.get(success, error);
  };
