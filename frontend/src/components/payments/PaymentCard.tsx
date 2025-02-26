import { border, flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { Box, Typography } from "@mui/material";
import { PaymentStatus } from "@type/Payment";

type PropTypes = {
  invoiceNumber: string;
  paymentStatus: PaymentStatus;
  paymentName: string;
  lawyerName: string;
  date: string;
  amount: string;
};

const PaymentCard = ({
  amount,
  date,
  invoiceNumber,
  lawyerName,
  paymentName,
  paymentStatus,
}: PropTypes) => {
  return (
    <Box {...border} px="10px" py="20px" bgcolor="white" display="flex" flexDirection="column" gap="5px" minWidth="500px" flexGrow={1}>
      <Box {...flexCenter} justifyContent="space-between">
        <Typography variant="body2">{invoiceNumber}</Typography>
        <Typography
          color={paymentStatus === PaymentStatus.PAID ? "secondary" : "warning"}
          textTransform="capitalize"
        >
          {paymentStatus}
        </Typography>
      </Box>
      <Typography variant="h4">{paymentName}</Typography>
      <Typography variant="body2">{lawyerName}</Typography>
      <Typography variant="body2">{date}</Typography>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap="10px" width="350px">
          <MUIButton fullWidth size="small">Pay Now</MUIButton>
          <MUIButton fullWidth variant="outlined" color="secondary" size="small">Download Invoice</MUIButton>
        </Box>
        <Typography variant="h3">{amount}</Typography>
      </Box>
    </Box>
  );
};

export default PaymentCard;
