import { Typography } from "@mui/material"
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
    <div>
      <Typography variant="h2">Welcome back!</Typography>
      <EmailAndPasswordField form={loginForm} formType="signin" handleChange={handleChange} />
    </div>
  )
}

export default Login
