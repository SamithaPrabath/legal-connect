import { Box, Typography } from "@mui/material"
import { useAppSelector } from "@redux/hooks"
import { UserType } from "@type/User"
import { admin_dashboard_route, mycases_route } from "@utils/context-paths"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EmailAndPasswordField, { SignForm } from "./EmailAndPasswordField"

const Login = () => {

  const navigate = useNavigate();
  const auth = useAppSelector(state => state.portal.auth);

    const [loginForm, setLoginForm] = useState<SignForm>({
        email: "",
        password: ""
    })

    const handleChange = (name: string, value: string | null) => {
        setLoginForm(prev => ({...prev, [name]: value}))
    }

    useEffect(() => {
      if (auth.success && auth.data && auth.data.token && auth.data.userType) {
        localStorage.setItem("token", auth.data.token) 
        localStorage.setItem("userType", auth.data.userType);
        if (auth.data.userType !== UserType.ADMIN) navigate(mycases_route)
          else navigate(admin_dashboard_route);
      };
    },[auth]);


  return (
    <Box width="100%">
      <Typography variant="h2" textAlign="center" mb={3}>Welcome back!</Typography>
      <EmailAndPasswordField form={loginForm} formType="signin" handleChange={handleChange} />
    </Box>
  )
}

export default Login
