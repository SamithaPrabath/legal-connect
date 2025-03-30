import Header from "@components/Header";
import { Box } from "@mui/material";
import { UserType } from "@type/User";
import { admin_dashboard_route, create_account_route, login_signup_route, mycases_route } from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Home = () => {

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userType = new LocalStorageHandler().userType;

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isCurrentUrlAccessible = [create_account_route, login_signup_route].includes(pathname) 
    if (!token && !isCurrentUrlAccessible){
      navigate(login_signup_route);
      return;
    }
    if (pathname === "/") {
      if (userType === UserType.ADMIN) navigate(admin_dashboard_route);
      else navigate(mycases_route);
    }
  },[pathname])

  return (
    <Box position="relative">
      <Header />
      <Outlet />
    </Box>
  );
};

export default Home;
