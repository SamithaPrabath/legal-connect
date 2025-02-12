import { styled, TextField } from "@mui/material";

const OutlinedTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderWidth: "1px",
    fontSize: "14px",
    borderRadius: "10px",
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
  },
}));

export default OutlinedTextField;
