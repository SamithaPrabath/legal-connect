import Header from "@components/Header";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <Box position="relative">
      <Header />
      <Outlet />
    </Box>
  );
};

export default Home;
