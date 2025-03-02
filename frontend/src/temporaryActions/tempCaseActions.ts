import {
  caseListReject,
  caseListRequest,
  caseListSuccess,
} from "@redux/slices/cases/list";
import {
  casePageReject,
  casePageRequest,
  casePageSuccess,
} from "@redux/slices/cases/page";
import { CaseResponse } from "@type/Case";
import Requests from "@utils/Requests";
import { case_url } from "@utils/urls/resources/case";
import { useDispatch } from "react-redux";

export const tempGetAllCases =
  () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(casePageRequest());

    const success = (data: CaseResponse[]) => {
      dispatch(casePageSuccess({ data, totalCount: data.length }));
    };

    const error = (message: string) => {
      dispatch(casePageReject(message));
    };

    const request = new Requests(case_url);

    await request.get(success, error);
  };

export const tempGetAllCasesList =
  () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(caseListRequest());

    const success = (data: CaseResponse[]) => {
      dispatch(caseListSuccess(data));
    };

    const error = (message: string) => {
      dispatch(caseListReject(message));
    };

    const request = new Requests(case_url);

    await request.get(success, error);
  };
