import { paymentListAction, paymentRequestAction } from "@actions/paymentActions";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import ParentCard from "@components/ParentCard";
import { Box } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { tempPaymentListAction } from "@temporaryActions/tempPaymentActions";
import { PaymentRequest } from "@type/Payment";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";

const PaymentRequestForm = () => {
  const [paymentForm, setPaymentForm] = useState<PaymentRequest>({
    amount: 0,
    clientId: "",
    dueDate: "",
    invoiceId: "",
    lawyerId: "",
    name: "",
  });

  const userId = new LocalStorageHandler().profileId;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!userId) return;
    setPaymentForm((prev) => ({ ...prev, lawyerId: userId }));
  }, [userId]);

  const handleChange = (name: string, value: string | null) => {
    setPaymentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await paymentRequestAction(paymentForm);
    refreshPaymentList();
  };

  const refreshPaymentList = () => {
    if (!userId) return;
    if (isBackendConnected) dispatch(paymentListAction(userId))
      else dispatch(tempPaymentListAction());
  }

  return (
    <ParentCard title="New Payment Request" titleVariant="h3">
      <Box width="100%" display="flex" gap="10px">
        <Box width="20%">
          <FormField
            fullWidth
            label="Invoice ID"
            name="invoiceId"
            value={paymentForm.invoiceId}
            handleChange={handleChange}
          />
        </Box>
        <Box width="80%">
          <FormField
            fullWidth
            label="Payment Name"
            name="name"
            value={paymentForm.name}
            handleChange={handleChange}
          />
        </Box>
      </Box>
      <FormField
        fullWidth
        label="Client Profile ID"
        name="clientId"
        value={paymentForm.clientId}
        handleChange={handleChange}
      />
      <FormField
        fullWidth
        label="Amount"
        name="amount"
        value={paymentForm.amount}
        onChange={(e) =>
          setPaymentForm((prev) => ({
            ...prev,
            amount: Number(e.target.value),
          }))
        }
      />
      <FormField
        fullWidth
        label="Due date"
        name="dueDate"
        type="date"
        value={paymentForm.dueDate}
        onChange={(e) => handleChange("dueDate", e.target.value)}
      />
      <MUIButton onClick={handleSubmit}>Send Request</MUIButton>
    </ParentCard>
  );
};

export default PaymentRequestForm;
