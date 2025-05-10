import MUIButton from "@components/MUIButton";
import MUITypography from "@components/MUITypography";
import { CheckCircle } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  updateUserContactInfo,
  updateUserPassword,
  updateUserType
} from "@redux/slices/user/form";
import { UserType } from "@type/User";
import { useState } from "react";
import EmailAndPasswordField from "./EmailAndPasswordField";

const SignUp = () => {
  const [isAccountTypeSelected, setIsAccountTypeSelected] =
    useState<boolean>(false);

  const { form } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleAccountType = (type: UserType) => {
    dispatch(updateUserType(type));
  };

  const handleAccountTypeSelect = () => {
    if (!form.type) {
      // throw a error notification
      return;
    }
    setIsAccountTypeSelected(true);
  };

  const handleChange = (name: string, value: string | null) => {
    const contactInfo = { ...form.contactInfo };
    if (name === "email") {
      contactInfo.email = value || "";
      dispatch(updateUserContactInfo(contactInfo));
    } else if (name === "password") dispatch(updateUserPassword(value));
  };

  return (
    <Box width="100%">
      <MUITypography variant="h2" mb={3} textAlign="center">
        Create Your Account
      </MUITypography>
      {isAccountTypeSelected ? (
        <EmailAndPasswordField
          form={{ email: form.contactInfo.email, password: form.password }}
          handleChange={handleChange}
          formType="signup"
        />
      ) : (
        <AccountTypeManager
          selectedAccountType={form.type}
          handleAccountType={handleAccountType}
          handleAccountTypeSelect={handleAccountTypeSelect}
        />
      )}
    </Box>
  );
};

const AccountTypeManager = ({
  selectedAccountType,
  handleAccountType,
  handleAccountTypeSelect,
}: {
  selectedAccountType: UserType | null;
  handleAccountType: (type: UserType) => void;
  handleAccountTypeSelect: () => void;
}) => {
  const accountCards: AccountCard[] = [
    {
      label: "I am a Client",
      description: "I find and connect with lawyers for my legal needs",
      value: UserType.CLIENT,
    },
    {
      label: "I am a Lawyer",
      description:
        "I manage cases, interact with clients, and offer legal services",
      value: UserType.LAWYER,
    },
  ];
  return (
    <Box>
      <Typography variant="body2" marginBottom="15px">
        Welcome to LegalConnect! To get started, please select your role. If
        you're seeking legal assistance, choose ‘Client.’ If you're a legal
        professional offering services, choose ‘Lawyer.’ This will help us
        tailor the experience to your needs.
      </Typography>
      <RadioGroup
        value={selectedAccountType}
        aria-label="Account Type"
        onChange={(event) =>
          handleAccountType(event.target.value as unknown as UserType)
        }
      >
        <List>
          {accountCards.map(({ label, description, value }) => (
            <ListItem
              onClick={() => handleAccountType(value)}
              sx={{
                border: (theme) => {
                  const { divider, primary } = theme.palette;

                  return `1px solid ${
                    selectedAccountType === value ? primary.main : divider
                  }`;
                },
                transition: "border-color 0.25s",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <AccountTypeCard
                label={label}
                description={description}
                value={value}
              />
            </ListItem>
          ))}
        </List>
      </RadioGroup>
      <MUIButton fullWidth onClick={handleAccountTypeSelect}>
        Continue
      </MUIButton>
    </Box>
  );
};

type AccountCard = {
  label: string;
  description: string;
  value: UserType;
};

const AccountTypeCard = ({ label, description, value }: AccountCard) => {
  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="start"
      sx={{ cursor: "default" }}
    >
      <Box display="flex" flexDirection="column">
        <MUITypography variant="h5">{label}</MUITypography>
        <Typography variant="body1">{description}</Typography>
      </Box>
      <Radio
        value={value}
        size="small"
        checkedIcon={<CheckCircle />}
        sx={{
          cursor: "auto",
          color: "transparent",
          p: 0,
          "& .MuiSvgIcon-root": {
            fontSize: 15,
          },
          "&:hover": {
            backgroundColor: "transparent",
          },
          "&.Mui-checked::before": {
            backgroundColor: "transparent",
          },
        }}
      />
    </Box>
  );
};

export default SignUp;
