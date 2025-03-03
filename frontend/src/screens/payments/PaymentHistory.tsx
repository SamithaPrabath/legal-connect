import PaymentCard from "@components/payments/PaymentCard";
import { Box } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { PaymentStatus } from "@type/Payment";

const PaymentHistory = () => {
  const { data: paymentList } = useAppSelector(state => state.payment.list);

  return (
    <Box display="flex" flexDirection="column" gap="30px" p="30px">
      <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(520px, 1fr))" alignContent="start" gap="20px">
        {paymentList?.filter(payment => payment.status === PaymentStatus.PAID).map((payment) => (
          <PaymentCard {...payment} />
        ))}
      </Box>
    </Box>
  );
}

export default PaymentHistory
