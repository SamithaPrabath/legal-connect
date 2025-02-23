import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import { Box } from "@mui/material";

export type SignForm = {
  email: string;
  password: string;
};

type PropTypes = {
  handleChange: (
   name: string, value: string | null
  ) => void;
  form: SignForm;
  formType: "signin" | "signup";
};

const EmailAndPasswordField = ({ handleChange, form, formType }: PropTypes) => {
  return (
    <Box>
      <FormField
        fullWidth
        label="Email"
        name="email"
        value={form.email}
        handleChange={handleChange}
      />
      <FormField
        fullWidth
        label="Password"
        name="password"
        value={form.password}
        type="password"
        handleChange={handleChange}
      />

      <MUIButton fullWidth>
        {formType === "signin" ? "Login" : "Continue"}
      </MUIButton>
    </Box>
  );
};

export default EmailAndPasswordField;
