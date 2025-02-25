import { flexCenter } from "@assets/style/boxStyles";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export type Section = {
  label: string;
  contextPath: string;
};

type PropTypes = {
  sections: Section[];
  activeSection: Section | null;
};

const SectionNavBar = ({ sections, activeSection }: PropTypes) => {
  return (
    <Box {...flexCenter} width="fit-content">
      {sections.map((section) => (
        <NavbarElement section={section} activeSection={activeSection} />
      ))}
    </Box>
  );
};

const NavbarElement = ({
  section,
  activeSection,
}: {
  section: Section;
  activeSection: Section | null;
}) => {
  const navigate = useNavigate();
  const { divider } = useTheme().palette;

  const isActive = activeSection?.contextPath === section.contextPath;

  return (
    <Box
      bgcolor="white"
      borderBottom={`2px solid ${isActive ? "black" : divider}`}
      sx={{ transition: "all 0.25s", cursor:"pointer" }}
      textAlign="center"
      width="200px"
      pb="5px"
      onClick={() => navigate(section.contextPath)}
    >
      <Typography variant={isActive ? "body1" : "body2"} sx={{fontWeight:600}}>{section.label}</Typography>
    </Box>
  );
};

export default SectionNavBar;
