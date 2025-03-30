import { loginAction } from "@actions/portalAction";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { updateUserAbout } from "@redux/slices/user/form";
import { tempLoginAction } from "@temporaryActions/tempPortalActions";
import { AboutInfo, UserType } from "@type/User";
import { create_account_route } from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const { form: userForm } = useAppSelector(state => state.user);
  const { loading } = useAppSelector(state => state.portal.auth);
  const dispatch = useAppDispatch();

  const isEmailAndPasswordValid = () => {
    if (form.email === "admin") return true;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(form.email) && form.password.length > 4
  }

  const handleClick = () => {
    if (!isEmailAndPasswordValid()) {
      // throw an error message here
      return;
    }
    if (formType === "signup"){
      if (userForm.type === UserType.LAWYER){
        const about: AboutInfo = {
          bio: "",
          credentialsAndEducation: "",
          practiceAreas: [],
          workHistory: ""
        }
        dispatch(updateUserAbout(about))
      }
      navigate(create_account_route)
    }
    else {
      if (isBackendConnected){
        dispatch(loginAction(form.email, form.password));
      }else 
        dispatch(tempLoginAction(form.email, form.password));
    }
  }

  return (
    <Box>
      <FormField
        fullWidth
        type="email"
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

      <MUIButton fullWidth onClick={handleClick} loading={loading}>
        {formType === "signin" ? "Login" : "Continue"}
      </MUIButton>
    </Box>
  );
};

export default EmailAndPasswordField;
