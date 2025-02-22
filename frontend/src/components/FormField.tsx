import { Box, TextFieldProps } from "@mui/material";
import { ChangeEventHandler } from "react";
import OutlinedTextField from "./MUITextField";
import MUITypography from "./MUITypography";

type PropTypes = {
  label: string;
  name: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & TextFieldProps;

const FormField = ({ label, name, value, onChange, ...rest }: PropTypes) => {
  return (
    <Box sx={{ width: "100%" }}>
      <MUITypography
        fontSize={"14px"}
        fontWeight={"500"}
        // ml={1}
        mb={1}
        color="secondary"
      >
        {label}
      </MUITypography>
      <OutlinedTextField
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

export default FormField;
