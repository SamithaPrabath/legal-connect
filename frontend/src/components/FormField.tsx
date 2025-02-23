import { Autocomplete, Box, TextFieldProps, Typography } from "@mui/material";
import OutlinedTextField from "./MUITextField";

type PropTypes<T> = {
  label: string;
  name: string;
  value?: T | null;
  autocomplete?: boolean;
  options?: T[];
  optionLabel?: (option: T) => string;
  handleChange?: (name: string, value: string | T | null) => void;
  onInputChange?: (value: string) => void;
} & TextFieldProps;

const FormField = <T,>({
  label,
  name,
  value,
  autocomplete = false,
  handleChange,
  onInputChange,
  options = [],
  optionLabel,
  ...rest
}: PropTypes<T>) => {
  return (
    <Box sx={{ width: "100%" }} mb={2}>
      <Typography variant="h6" mb={1}>
        {label}
      </Typography>
      {!autocomplete ? (
        <OutlinedTextField
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
