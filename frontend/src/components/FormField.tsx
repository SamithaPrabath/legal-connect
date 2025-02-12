import { Box, TextFieldProps } from "@mui/material";
import { ChangeEventHandler } from "react";
import CustomTypography, {
    fontSizes,
    fontWeights,
} from "../typography/CustomTypography";
import OutlinedTextField from "./OutlinedTextField";

type PropTypes = {
  label: string;
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
} & TextFieldProps;

const FormField = ({ label, name, value, onChange, ...rest }: PropTypes) => {
  return (
    <Box sx={{ width: "100%" }}>
      <CustomTypography
        fontSize={fontSizes.sm}
        fontWeight={fontWeights.xl}
        ml={1}
        mb={1}
      >
        {label}
      </CustomTypography>
      <OutlinedTextField
        name={name}
        fullWidth
        placeholder={label}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

export default FormField;
