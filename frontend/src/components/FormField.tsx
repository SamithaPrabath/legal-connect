import { Autocomplete, Box, BoxProps, TextFieldProps, Typography } from "@mui/material";
import OutlinedTextField from "./MUITextField";

type PropTypes<T> = {
  label: string;
  name: string;
  value?: T | null;
  readOnly?: boolean;
  autocomplete?: boolean;
  options?: T[];
  optionLabel?: (option: T) => string;
  handleChange?: (name: string, value: string | T | null) => void;
  onInputChange?: (value: string) => void;
  boxProps?:BoxProps
} & TextFieldProps;

const FormField = <T,>({
  label,
  name,
  value,
  readOnly,
  autocomplete = false,
  handleChange,
  onInputChange,
  options = [],
  optionLabel,
  boxProps,
  ...rest
}: PropTypes<T>) => {
  return (
    <Box sx={{ width: "100%" }} mb={2} {...boxProps}>
      <Typography variant="h6" mb={1}>
        {label}
      </Typography>
      {!autocomplete ? (
        <OutlinedTextField
          InputProps={{
            readOnly
          }}
          name={name}
          value={value}
          placeholder={label}
          onChange={(e) => {
            if (handleChange) handleChange(name, e.target.value);
          }}
          {...rest}
        />
      ) : (
        <Autocomplete
          fullWidth
          options={options}
          getOptionLabel={optionLabel}
          value={value}
          onChange={(_, value) => {
            if (handleChange) handleChange(name, value);
          }}
          renderInput={(params) => (
            <OutlinedTextField
              placeholder={label}
              {...params}
            />
          )}
          onInputChange={(_, value) => {
            if (onInputChange) onInputChange(value);
          }}
        />
      )}
    </Box>
  );
};

export default FormField;
