import { Box, useTheme } from "@mui/material";
import Logo from "@components/Logo";
import NavigationBar from "./NavigationBar";
import NavIconBar from "./NavIconBar";

const Header = () => {
  const theme = useTheme();
  const { divider } = theme.palette;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px="30px"
      py="10px"
      bgcolor="white"
      borderBottom={`1px solid ${divider}`}
      position="sticky"
      top={0}
      left={0}
      zIndex={5}
    >
      <Logo />
      <NavigationBar />
      <NavIconBar />
    </Box>
  );
};

export default Header;
