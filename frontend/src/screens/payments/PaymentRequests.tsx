import PaymentCard from "@components/payments/PaymentCard";
import PaymentRequestForm from "@components/payments/PaymentRequestForm";
import { Box } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { PaymentResponse, PaymentStatus } from "@type/Payment";
import { UserType } from "@type/User";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useState } from "react";
import PaymentGateway from "./PaymentGateway";

const PaymentRequests = () => {
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayemnt] = useState<PaymentResponse | null>(null);
  const { data: paymentList } = useAppSelector(state => state.payment.list);
  const localStorageHandler = new LocalStorageHandler()
  const userType = localStorageHandler.userType;


  const handlePaymentGatewayClose = () => {
    setTimeout(() => {
      setSelectedPayemnt(null)
    }, 600);
    setOpen(false);
  }

  const handleOpen = (payment: PaymentResponse) => {
    setSelectedPayemnt(payment);
    setOpen(true);
  }

  return (
      <Box display="flex" flexDirection="column" gap="30px" p="30px">
        {userType === UserType.LAWYER && <PaymentRequestForm />}
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(520px, 1fr))" alignContent="start" gap="20px">
          {paymentList?.filter(payment => payment.status === PaymentStatus.UNPAID).map((payment) => (
            <PaymentCard payment={payment} handleOpenGateway={handleOpen} />
          ))}
        </Box>
        <PaymentGateway open={open} payment={selectedPayment} handleClose={handlePaymentGatewayClose} />
      </Box>
  );
};

export default PaymentRequests;
