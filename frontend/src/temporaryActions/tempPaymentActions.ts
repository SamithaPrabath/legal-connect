import { paymentListReject, paymentListRequest, paymentListSuccess } from "@redux/slices/payment/list";
import Requests from "@utils/Requests";
import { payment_url } from "@utils/urls/resources/payment";
import { useDispatch } from "react-redux";
import { PaymentResponse } from "@type/Payment";

export const tempPaymentListAction = () => async (dispatch: ReturnType<typeof useDispatch>) => {
    dispatch(paymentListRequest());

    const request = new Requests(payment_url)

    const success = (data: PaymentResponse[]) => {
        dispatch(paymentListSuccess(data))
    }

    const error = (message: string) => {
        dispatch(paymentListReject(message))
    }

    await request.get(success, error);
}