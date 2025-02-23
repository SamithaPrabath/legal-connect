import Logo from "@components/Logo";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import LoginImage from "@assets/images/login_image.png";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);

  const switchCompos = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Box display="flex" justifyContent="space-between" >
      <Box width="30%" py={3} px={5}>
        <Box display="flex" alignItems="center" justifyContent="space-between" >
        <Logo />
        <Box zIndex={10}>
            <Typography display="inline-block" mr={1}>
              {isLogin ? "Don't you have" : "Already have"} an account ? 
            </Typography>
            <Typography
              width="fit-content"
              display="inline-block"
              color="secondary"
              sx={{ cursor: "pointer", ":hover": { textDecoration: "underline" } }}
              onClick={switchCompos}
            >
              {isLogin ? "Create an account" : "Login"}
            </Typography>
        </Box>
        </Box>
        <Box height="100%" display="flex" justifyContent="center" alignItems="center" position="relative" bottom={50} px={3}>
        {isLogin ? <Login /> : <SignUp />}
        </Box>
      </Box>
      <Box flex="1" width="70%" height="100dvh" sx={{
        backgroundImage: `url(${LoginImage})`,
        backgroundSize: "cover",
        backgroundPosition: "right"
      }} />
    </Box>
  );
};

export default LoginSignUp;
