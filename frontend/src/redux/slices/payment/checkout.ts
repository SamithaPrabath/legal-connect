import createApiSlice from "../config/apiSlice";

const paymentCheckoutSlice = createApiSlice<PaymentResponse>("paymentCheckout");

export const {
    request: paymentCheckoutRequest,
    success: paymentCheckoutSuccess,
    reject: paymentCheckoutReject
} = paymentCheckoutSlice.actions;

export default paymentCheckoutSlice.reducer;