import PaymentCard from "@components/payments/PaymentCard";
import { Box } from "@mui/material";
import { PaymentStatus } from "@type/Payment";

const PaymentRequests = () => {
  const payments = [
    {
      invoiceNumber: "INV-1001",
      paymentStatus: PaymentStatus.UNPAID,
      paymentName: "Case Retainer Fee",
      lawyerName: "Sarah Johnson, Esq.",
      date: "Feb 1, 2025",
      amount: "$1,500",
    },
    {
      invoiceNumber: "INV-1001",
      paymentStatus: PaymentStatus.UNPAID,
      paymentName: "Case Retainer Fee",
      lawyerName: "Sarah Johnson, Esq.",
      date: "Feb 1, 2025",
      amount: "$1,500",
    },
    {
      invoiceNumber: "INV-1001",
      paymentStatus: PaymentStatus.UNPAID,
      paymentName: "Case Retainer Fee",
      lawyerName: "Sarah Johnson, Esq.",
      date: "Feb 1, 2025",
      amount: "$1,500",
    },
    {
      invoiceNumber: "INV-1001",
      paymentStatus: PaymentStatus.UNPAID,
      paymentName: "Case Retainer Fee",
      lawyerName: "Sarah Johnson, Esq.",
      date: "Feb 1, 2025",
      amount: "$1,500",
    },
    {
      invoiceNumber: "INV-1001",
      paymentStatus: PaymentStatus.UNPAID,
      paymentName: "Case Retainer Fee",
      lawyerName: "Sarah Johnson, Esq.",
      date: "Feb 1, 2025",
      amount: "$1,500",
    },
  ];

  return (
    <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(52f0px, 1fr))" alignContent="start" gap="20px" p="30px">
      {payments.map((payment) => (
        <PaymentCard {...payment} />
      ))}
    </Box>
  );
};

export default PaymentRequests;
