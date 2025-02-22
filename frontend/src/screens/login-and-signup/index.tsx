import Logo from '@components/Logo';
import { Typography } from '@mui/material';
import { useState } from 'react';
import Login from './Login';
import SignUp from './SignUp';

const LoginSignUp = () => {
    const [isLogin, setIsLogin] = useState<boolean>(false);

    const switchCompos = () => {
        setIsLogin(!isLogin);
    }

  return (
    <div>
      <Logo />
      <Typography>{isLogin ? "Don't you have": "Already have"} an account ?</Typography>
      <Typography width="fit-content" color='secondary' sx={{cursor:"pointer", ":hover": { textDecoration: "underline"}}} onClick={switchCompos}>{isLogin ? "Create an account": "Login"}</Typography>
      {isLogin 
        ? <Login />
        : <SignUp />
      }
    </div>
  )
}

export default LoginSignUp
