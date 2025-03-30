import { singleCaseReject, singleCaseRequest, singleCaseSuccess } from "@redux/slices/cases/case";
import {
  caseTypesReject,
  caseTypesRequest,
  caseTypesSuccess,
} from "@redux/slices/cases/caseTypes";
import { caseListReject, caseListRequest, caseListSuccess } from "@redux/slices/cases/list";
import {
  casePageReject,
  casePageRequest,
  casePageSuccess,
} from "@redux/slices/cases/page";
import { CaseRequest, CaseResponse, CaseStatus } from "@type/Case";
import { PageType } from "@type/Page";
import Requests from "@utils/Requests";
import {
  case_byId_url,
  case_byUserId_url as case_listByUserId_url,
  case_pageByLawyerId_url,
  case_type_url,
  case_url,
} from "@utils/urls/resources/case";
import { useDispatch } from "react-redux";

export const caseTypeListAction =
  () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(caseTypesRequest());
    const requests = new Requests(case_type_url);

    const successCallBack = (data: string[]) =>
      dispatch(caseTypesSuccess(data));
    const rejectCallBack = (message: string) =>
      dispatch(caseTypesReject(message));

    await requests.get(successCallBack, rejectCallBack);
  };

export const caseCreateAction = async (caseForm: CaseRequest) => {
  const request = new Requests(case_url, caseForm);
  await request.post();
};

export const casePageAction =
  (lawyerId: string, page: number, pageSize: number, status?: CaseStatus, name?:string) =>
  async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(casePageRequest());

    const successCallBack = (data: PageType<CaseResponse>) =>
      dispatch(casePageSuccess(data));
    const rejectCallBack = (message: string) =>
      dispatch(casePageReject(message));

    const request = new Requests(case_pageByLawyerId_url(lawyerId), null, {
      page,
      pageSize,
      name,
      status
    });

    await request.get(successCallBack, rejectCallBack);
  };

export const caseListAction = (profileId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
        dispatch(caseListRequest());
    
        const successCallBack = (data: CaseResponse[]) =>
          dispatch(caseListSuccess(data));
        const rejectCallBack = (message: string) =>
          dispatch(caseListReject(message));
    
        const request = new Requests(case_listByUserId_url(profileId));
    
        await request.get(successCallBack, rejectCallBack);
}

export const caseByIdAction = (caseId: string) => async(dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(singleCaseRequest());

    const successCallback = (data: CaseResponse) =>
        dispatch(singleCaseSuccess(data));
      const rejectCallBack = (message: string) =>
        dispatch(singleCaseReject(message));

    const request = new Requests(case_byId_url(caseId));

    await request.get(successCallback, rejectCallBack);
}

export const caseUpdateStatusAction = (caseId: string, status: CaseStatus) => async(dispatch: ReturnType<typeof useDispatch>) => {
    const request = new Requests(case_byId_url(caseId), null, {status});

    dispatch(singleCaseRequest());

    const successCallBack = (data: CaseResponse) =>
        dispatch(singleCaseSuccess(data));
      const rejectCallBack = (message: string) =>
        dispatch(singleCaseReject(message));

    await request.put(successCallBack, rejectCallBack);
}