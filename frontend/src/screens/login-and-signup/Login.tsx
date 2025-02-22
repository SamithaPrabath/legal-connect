import { Box, Typography } from "@mui/material"
import { useState } from "react"
import EmailAndPasswordField, { SignForm } from "./EmailAndPasswordField"

const Login = () => {
    const [loginForm, setLoginForm] = useState<SignForm>({
        email: "",
        password: ""
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setLoginForm(prev => ({...prev, [name]: value}))
    }

  return (
    <Box width="100%">
      <Typography variant="h2" textAlign="center">Welcome back!</Typography>
      <EmailAndPasswordField form={loginForm} formType="signin" handleChange={handleChange} />
    </Box>
  )
}

export default Login
