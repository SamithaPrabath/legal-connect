import { border, flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { Box, Typography } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { tempPaymentListAction } from "@temporaryActions/tempPaymentActions";
import { PaymentResponse, PaymentStatus } from "@type/Payment";
import { UserType } from "@type/User";
import { payment_history_route } from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useLocation } from "react-router-dom";
import {
  downloadPaymentInvoice,
  paymentDeleteAction,
  paymentListAction
} from "../../actions/paymentActions";

type PropTypes = {
  payment: PaymentResponse;
  handleOpenGateway?: (payment: PaymentResponse) => void
}

const PaymentCard = ({
  payment,
  handleOpenGateway
}: PropTypes) => {

  const { amount,
    dueDate,
    invoiceId,
    lawyer,
    name,
    id,
    status } = payment;

  const { pathname } = useLocation();

  const localStorageHandler = new LocalStorageHandler();
  const userType = localStorageHandler.userType;
  const userId = localStorageHandler.profileId;

  const dispatch = useAppDispatch();

  const handleDeletePayment = async () => {
    await paymentDeleteAction(id);
    refreshPaymentList();
  };

  const handleDownloadInvoice = async () => {
    await downloadPaymentInvoice(id);
    refreshPaymentList();
  };

  const refreshPaymentList = () => {
    if (!userId) return;
    if (isBackendConnected) dispatch(paymentListAction(userId));
    else dispatch(tempPaymentListAction());
  };

  return (
    <Box
      {...border}
      px="10px"
      py="20px"
      bgcolor="white"
      display="flex"
      flexDirection="column"
      gap="5px"
      minWidth="500px"
      flexGrow={1}
    >
      <Box {...flexCenter} justifyContent="space-between">
        <Typography variant="body2">{invoiceId}</Typography>
        <Typography
          color={status === PaymentStatus.PAID ? "secondary" : "warning"}
          textTransform="capitalize"
        >
          {status}
        </Typography>
      </Box>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="body2">{`${lawyer?.basicInfo.firstName} ${lawyer?.basicInfo.lastName}`}</Typography>
      <Typography variant="body2">{dueDate}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap="10px">
          {userType === UserType.CLIENT && payment.status === PaymentStatus.UNPAID && (
            <MUIButton
              fullWidth
              size="small"
              onClick={() => { if (handleOpenGateway) handleOpenGateway(payment)}}
              sx={{ width: "170px" }}
            >
              Pay Now
            </MUIButton>
          )}
          <MUIButton
            fullWidth
            variant="outlined"
            color="secondary"
            size="small"
            onClick={handleDownloadInvoice}
            sx={{ width: "170px" }}
          >
            Download Invoice
          </MUIButton>
          {userType === UserType.LAWYER &&
            pathname !== payment_history_route && (
              <MUIButton
                fullWidth
                variant="outlined"
                color="secondary"
                size="small"
                sx={{ width: "170px" }}
                onClick={handleDeletePayment}
              >
                Delete Request
              </MUIButton>
            )}
        </Box>
        <Typography variant="h3">{amount}</Typography>
      </Box>
    </Box>
  );
};

export default PaymentCard;
