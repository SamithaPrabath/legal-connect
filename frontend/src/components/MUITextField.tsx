import { styled, TextField } from "@mui/material";

const MUITextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderWidth: "1px",
    fontSize: "14px",
    borderRadius: "4px",
    borderColor: "lightgray",
    "& fieldset": {
      borderColor: theme.palette.divider,
      transition: "border-color 0.35s",
    },
    "&:hover fieldset": {
      borderColor: theme.palette.text.secondary,
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.text.primary,
    },
  },
  "& input": {
    padding: "12px",
    "::placeholder": {
      textTransform:"capitalize"
    }
  },
}));

export default MUITextField;
