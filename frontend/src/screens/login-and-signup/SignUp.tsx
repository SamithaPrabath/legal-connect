import MUIButton from "@components/MUIButton";
import MUITypography from "@components/MUITypography";
import { CheckCircle } from "@mui/icons-material";
import { Box, List, ListItem, Radio, RadioGroup, Typography } from "@mui/material";
import AccountType from "@type/AccountType";
import { useState } from "react";
import EmailAndPasswordField, { SignForm } from "./EmailAndPasswordField";

const SignUp = () => {
    const [accountType, setAccountType] = useState<AccountType | null>(null);
    const [isAccountTypeSelected, setIsAccountTypeSelected] = useState<boolean>(false);
    const [userForm, setUserForm] = useState<SignForm>({
        email: "",
        password: ""
    })

    const handleAccountType = (type: AccountType) => {
        setAccountType(type)
    }

    const handleAccountTypeSelect = () => {
        if (!accountType) {
            // throw a error notification
            return;
        }
        setIsAccountTypeSelected(true);
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name , value } = event.target;
        setUserForm(prev => ({...prev, [name]: value}))
    }

  return (
    <Box>
        <MUITypography variant="h2">Create Your Account</MUITypography>
        {isAccountTypeSelected  
           ? <EmailAndPasswordField form={userForm} handleChange={handleChange} formType="signup" />
           : <AccountTypeManager selectedAccountType={accountType} handleAccountType={handleAccountType} handleAccountTypeSelect={handleAccountTypeSelect} />
        }
    </Box>
  )
}

const AccountTypeManager = ({selectedAccountType, handleAccountType, handleAccountTypeSelect}: {selectedAccountType: AccountType | null, handleAccountType: (type: AccountType) => void, handleAccountTypeSelect: () => void}) => {
    const accountCards: AccountCard[] = [{
        label: "I am a Client",
        description: "I find and connect with lawyers for my legal needs",
        value: AccountType.CLIENT
    },
    {
        label: "I am a Lawyer",
        description: "I manage cases, interact with clients, and offer legal services",
        value: AccountType.LAWYER
    }
]
    return (
        <Box>
            <Typography variant="body2">Welcome to LegalConnect! To get started, please select your role. If you're seeking legal assistance, choose ‘Client.’ If you're a legal professional offering services, choose ‘Lawyer.’ This will help us tailor the experience to your needs.</Typography>
            <RadioGroup value={selectedAccountType} aria-label="Account Type" onChange={(event) => handleAccountType(event.target.value as unknown as AccountType)}>
                <List>
                    {accountCards.map(({label, description, value}) => <AccountTypeCard  label={label} description={description} value={value}/>)}
                </List>
            </RadioGroup>
            <MUIButton onClick={handleAccountTypeSelect}>Continue</MUIButton>
        </Box>
    )
}

type AccountCard = {
    label: string,
    description: string,
    value: AccountType
}

const AccountTypeCard = ({label, description, value}: AccountCard) => {
    return (
        <ListItem>
            <Box display="flex" flexDirection="column">
                <MUITypography variant="h5">{label}</MUITypography>
                <Typography variant="body1">{description}</Typography>
            </Box>
            <Radio value={value} size="small" checkedIcon={<CheckCircle />} />
        </ListItem>
    )
}

export default SignUp
