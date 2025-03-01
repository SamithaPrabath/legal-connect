import { caseTypesReject, caseTypesRequest, caseTypesSuccess } from "@redux/slices/cases/caseTypes";
import Requests from "@utils/Requests";
import { case_type_url } from "@utils/urls/resources/case";
import { useDispatch } from "react-redux";

export const caseTypeListAction = () => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(caseTypesRequest());
    const requests = new Requests(case_type_url);

    const successCallBack = (data: string[]) => dispatch(caseTypesSuccess(data));
    const rejectCallBack = (message: string) => dispatch(caseTypesReject(message));

    await requests.get(successCallBack, rejectCallBack);
}