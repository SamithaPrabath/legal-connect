import { paymentListReject, paymentListRequest, paymentListSuccess } from "@redux/slices/payment/list";
import { PaymentRequest, PaymentResponse } from "@type/Payment";
import Requests from "@utils/Requests";
import { payment_byId_url, payment_download_url, payment_url } from "@utils/urls/resources/payment";
import { useDispatch } from "react-redux";

export const paymentListAction = (userId: string) => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(paymentListRequest());

    const request = new Requests(payment_url, null, {userId})

    const success = (data: PaymentResponse[]) => {
        dispatch(paymentListSuccess(data))
    }

    const error = (message: string) => {
        dispatch(paymentListReject(message))
    }

    await request.get(success, error);
}

export const paymentRequestAction = async(payment: PaymentRequest) => {
    const request = new Requests(payment_url, payment);
    await request.post();
}

export const downloadPaymentInvoice = async (paymentId: string) => {
    const request = new Requests(payment_download_url(paymentId));
    await request.get<Blob>(
        (data) => {
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', "payment.pdf");
            document.body.appendChild(link);
            link.click();
            link.remove();
        },
        (errorMessage) => {
            console.error('Error downloading document:', errorMessage);
        }
    );
};

export const paymentCheckoutAction = async (paymentId: string) => {
    const request = new Requests(payment_byId_url(paymentId));
    await request.put();
}

export const paymentDeleteAction = async (paymentId: string) => {
    const request = new Requests(payment_byId_url(paymentId));
    await request.delete();
}