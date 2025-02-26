import { flexCenter } from "@assets/style/boxStyles";
import { Box, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export type Section = {
  label: string;
  contextPath: string;
};

type PropTypes = {
  sections: Section[];
};

const SectionNavBar = ({ sections }: PropTypes) => {
  return (
    <Box {...flexCenter} width="fit-content">
      {sections.map((section) => (
        <NavbarElement section={section} />
      ))}
    </Box>
  );
};

const NavbarElement = ({
  section,
}: {
  section: Section;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { divider } = useTheme().palette;

  const isActive = location.pathname === section.contextPath;

  return (
    <Box
      bgcolor="white"
      borderBottom={`2px solid ${isActive ? "black" : divider}`}
      sx={{ transition: "all 0.25s", cursor:"pointer" }}
      textAlign="center"
      width="200px"
      pb="5px"
      {...!isActive && {position:"relative", top:"1px"}}
      onClick={() => navigate(section.contextPath)}
    >
      <Typography variant={isActive ? "body1" : "body2"} sx={{fontWeight:600}}>{section.label}</Typography>
    </Box>
  );
};

export default SectionNavBar;
