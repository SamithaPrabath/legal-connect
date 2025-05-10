import { eventListReject, eventListRequest, eventListSuccess } from "@redux/slices/event/list";
import { timeLineEventReject, timeLineEventRequest, timeLineEventSuccess } from "@redux/slices/event/timelineEvents";
import { timeslotReject, timeslotRequest, timeslotSuccess } from "@redux/slices/event/timeslots";
import { EventResponse, TimeLineEvent } from "@type/Event";
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

export const tempGetAllTimeLineEvents = () =>  async (dispatch: ReturnType<typeof useDispatch>) => {
  dispatch(timeLineEventRequest());

  const success = (data: TimeLineEvent[]) => {
    dispatch(timeLineEventSuccess(data));
  };

  const error = (message: string) => {
    dispatch(timeLineEventReject(message));
  };

  const request = new Requests(getUrl("timeLineEvents"));
  await request.get(success, error);
};