import createApiSlice from "../config/apiSlice";
import { PaymentResponse } from "@type/Payment";

const paymentListSlice = createApiSlice<PaymentResponse[]>("paymentList");

export const {
    request: paymentListRequest,
    success: paymentListSuccess,
    reject: paymentListReject,
    reset: paymentListReset
} = paymentListSlice.actions;

export default paymentListSlice.reducer