import Header from "@components/Header";
import { Box } from "@mui/material";
import { create_account_route, login_signup_route } from "@utils/context-paths";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Home = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isCurrentUrlAccessible = [create_account_route, login_signup_route].includes(pathname) 
    if (!token && !isCurrentUrlAccessible) navigate(login_signup_route);
  },[pathname])

  return (
    <Box position="relative">
      <Header />
      <Outlet />
    </Box>
  );
};

export default Home;
