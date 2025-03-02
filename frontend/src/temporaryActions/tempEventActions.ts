import { timeslotReject, timeslotRequest, timeslotSuccess } from "@redux/slices/event/timeslots";
import Requests from "@utils/Requests";
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