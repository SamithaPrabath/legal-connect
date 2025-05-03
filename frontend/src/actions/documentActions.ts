import { documentListReject, documentListRequest, documentListSuccess } from "@redux/slices/document/list";
import { documentUploadReject, documentUploadRequest, documentUploadSuccess } from '@redux/slices/document/upload';
import { DocumentRequest, DocumentResponse } from "@type/Document";
import Requests from '@utils/Requests';
import { document_byId_url, document_url, documents_byCaseId_url } from "@utils/urls/resources/document";
import { useDispatch } from "react-redux";
import { getTimeLineEventsByCaseId } from "./eventAction";

export const downloadDocument = async (documentId: string, fileName: string) => {
    const request = new Requests(document_byId_url(documentId));
    await request.get<Blob>(
        (data) => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        (errorMessage) => {
            console.error('Error downloading document:', errorMessage);
        }
    );
};

export const uploadDocument = (document: DocumentRequest) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(documentUploadRequest());

    const success = (data: DocumentResponse) => {
        dispatch(documentUploadSuccess(data));
        dispatch<any>(getTimeLineEventsByCaseId(document.caseId))
    };

    const error = (message: string) => {
        dispatch(documentUploadReject(message));
    };

    const request = new Requests(document_url, document, null);
    await request.post(success, error);
};

export const replaceDocument = (documentId: string, document: DocumentRequest) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(documentUploadRequest());

    const success = (data: DocumentResponse) => {
        dispatch(documentUploadSuccess(data));
    };

    const error = (message: string) => {
        dispatch(documentUploadReject(message));
    };

    const request = new Requests(document_byId_url(documentId), document, null);
    await request.put(success, error);
};

export const getDocumentsByCaseId = (caseId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(documentListRequest());

    const success = (data: DocumentResponse[]) => {
        dispatch(documentListSuccess(data));
    };

    const error = (message: string) => {
        dispatch(documentListReject(message));
    };

    const request = new Requests(documents_byCaseId_url(caseId));
    await request.get(success, error);
};

