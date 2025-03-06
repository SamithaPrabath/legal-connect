import {
  paymentCheckoutAction,
  paymentListAction,
} from "@actions/paymentActions";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import { Close } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useAppDispatch } from "@redux/hooks";
import { tempPaymentListAction } from "@temporaryActions/tempPaymentActions";
import { PaymentResponse } from "@type/Payment";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useState } from "react";

type PropTyps = {
  handleClose: () => void;
  open: boolean;
  payment: PaymentResponse | null;
};

const PaymentGateway = ({ open, handleClose, payment }: PropTyps) => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleChangeCardNumber = (_: string, value: string | null) => {
    if (!value) {
      setCardNumber(""); // Clear if empty or null
      return;
    }

    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    if (numericValue.length > 16) return; // Limit to 19 digits (excluding spaces)

    let formattedValue = "";
    for (let i = 0; i < numericValue.length; i++) {
      if ([4, 8, 12, 16].includes(i) && i !== 0) {
        formattedValue += " "; // Add space every 4 digits
      }
      formattedValue += numericValue[i];
    }

    setCardNumber(formattedValue);
  };

  const handleChangeExpireDate = (_: string, value: string | null) => {
    if (!value) {
      setExpireDate("");
      return;
    }
    if (value.length > 7) return;
    if (value.length === 3 && value.charAt(2) !== "/") return;

    const numbericValue = value?.replace("/", "");

    if (value?.length !== 3 && isNaN(Number(numbericValue))) return;
    if (value.length === 2 && Number(value) > 12) return;

    if (value && value.length === 2 && value.length > expireDate.length)
      setExpireDate(value + "/");
    else setExpireDate(value || "");
  };

  const handleChangeCvv = (_: string, value: string | null) => {
    if (!value) {
      setCvv("");
      return;
    }

    if (value.length > 3) return;
    if (isNaN(Number(value))) return;

    setCvv(value);
  };

  const handleCheckout = () => {
    if (!payment) return;
    paymentCheckoutAction(payment.id);
    refreshPaymentList();
  };

  const refreshPaymentList = () => {
    const userId = new LocalStorageHandler().profileId;
    if (!userId) return;
    if (isBackendConnected) dispatch(paymentListAction(userId));
    else dispatch(tempPaymentListAction());
  };

  return (
    <Box
      position="fixed"
      right="0"
      top="0"
      width="350px"
      height="100dvh"
      bgcolor="white"
      zIndex={10}
      boxShadow="-4px 0 4px 0px rgba(0,0,0,0.05)"
      p="5px"
      sx={{
        transition: "transform 0.45s",
        transform: `translateX(${open ? 0 : 370}px)`,
      }}
    >
      <Box display="flex" justifyContent="end">
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography variant="h2" fontWeight={700} textAlign="center">
        CHECKOUT
      </Typography>
      <Box mt="30px">
        <Box p="20px" py="0" textAlign="center">
          <Typography variant="body2">Amount</Typography>
          <Typography variant="h2">${payment?.amount || 0}</Typography>
        </Box>
        <Box p="20px" textAlign="center">
          <Typography variant="body2">Payment Name</Typography>
          <Typography variant="h4" textTransform="capitalize">
            {payment?.name || ""}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" p="20px" mt="30px">
        <FormField
          label="Card Number"
          placeholder="XXXX XXXX XXXX XXXX"
          name="cardNumber"
          fullWidth
          value={cardNumber}
          handleChange={handleChangeCardNumber}
        />
        <Box display="flex" gap="20px">
          <FormField
            label="Expire Date"
            placeholder="MM/YYYY"
            name="expireDate"
            fullWidth
            value={expireDate}
            handleChange={handleChangeExpireDate}
          />
          <FormField
            label="CVV"
            value={cvv}
            handleChange={handleChangeCvv}
            name="cvv"
            fullWidth
          />
        </Box>
        <Box display="flex" flexDirection="column">
          <MUIButton sx={{ mt: "20px" }} onClick={handleCheckout}>
            Checkout
          </MUIButton>
          <MUIButton
            onClick={handleClose}
            variant="outlined"
            color="secondary"
            sx={{ mt: "10px" }}
          >
            Cancel
          </MUIButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentGateway;
