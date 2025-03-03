import PaymentCard from "@components/payments/PaymentCard";
import PaymentRequestForm from "@components/payments/PaymentRequestForm";
import { Box } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { PaymentStatus } from "@type/Payment";
import { UserType } from "@type/User";
import LocalStorageHandler from "@utils/localStorageHandler";

const PaymentRequests = () => {
  const { data: paymentList } = useAppSelector(state => state.payment.list);
  const localStorageHandler = new LocalStorageHandler()
  const userType = localStorageHandler.userType;

  return (
    <Box display="flex" flexDirection="column" gap="30px" p="30px">
      {userType === UserType.LAWYER && <PaymentRequestForm />}
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(520px, 1fr))" alignContent="start" gap="20px">
        {paymentList?.filter(payment => payment.status === PaymentStatus.UNPAID).map((payment) => (
          <PaymentCard {...payment} />
        ))}
      </Box>
    </Box>
  );
};

export default PaymentRequests;
