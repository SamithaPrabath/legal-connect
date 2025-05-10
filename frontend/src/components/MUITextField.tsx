import { styled, TextField } from "@mui/material";

const MUITextField = styled(TextField)(({ theme, select}) => ({
  "& .MuiOutlinedInput-root": {
    borderWidth: "1px",
    fontSize: "12px",
    borderRadius: select ? "10px" : "4px",
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
  "& .MuiSelect-select": {
    padding: "12px", // Ensure proper padding inside the select
    textTransform: "capitalize", // Capitalize selected value
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.text.primary,
  },
}));

export default MUITextField;
