import { flexCenter } from "@assets/style/boxStyles";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export type Section = {
  label: string;
  contextPath: string;
};

type PropTypes = {
  sections: Section[];
} & BoxProps;

const SectionNavBar = ({ sections, ...rest }: PropTypes) => {
  return (
    <Box {...flexCenter} width="fit-content" {...rest}>
      {sections.map((section) => (
        <NavbarElement section={section} isWidthFlexible={!!rest.width} />
      ))}
    </Box>
  );
};

const NavbarElement = ({
  section,
  isWidthFlexible
}: {
  section: Section;
  isWidthFlexible: boolean;
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
      width= {isWidthFlexible? "100%" : "200px"}
      pb="5px"
      {...!isActive && {position:"relative", top:"1px"}}
      onClick={() => navigate(section.contextPath)}
    >
      <Typography variant={isActive ? "body1" : "body2"} sx={{fontWeight:600}}>{section.label}</Typography>
    </Box>
  );
};

export default SectionNavBar;
