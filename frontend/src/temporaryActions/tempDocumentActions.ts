import { documentListRequest, documentListSuccess, documentListReject } from "@redux/slices/document/list";
import { useDispatch } from "react-redux";
import Requests from "@utils/Requests";
import { DocumentResponse } from "@type/Document";
import { getUrl } from "@utils/urls/url-config";

export const tempGetDocumentsByCaseId = () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(documentListRequest());

    const request = new Requests(getUrl("documents"));

    try {
        await request.get<DocumentResponse[]>(
            (data) => dispatch(documentListSuccess(data)),
            (message) => dispatch(documentListReject(message))
        );
    } catch (error) {
        dispatch(documentListReject("Failed to fetch documents"));
    }
};
