import { caseTypesReject, caseTypesRequest, caseTypesSuccess } from "@redux/slices/cases/caseTypes";
import { CaseRequest } from "@type/Case";
import Requests from "@utils/Requests";
import { case_type_url, case_url } from "@utils/urls/resources/case";
import { useDispatch } from "react-redux";

export const caseTypeListAction = () => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(caseTypesRequest());
    const requests = new Requests(case_type_url);

    const successCallBack = (data: string[]) => dispatch(caseTypesSuccess(data));
    const rejectCallBack = (message: string) => dispatch(caseTypesReject(message));

    await requests.get(successCallBack, rejectCallBack);
}

export const caseCreateAction = async (caseForm: CaseRequest) => {
    const request = new Requests(case_url, caseForm);
    await request.post()
}