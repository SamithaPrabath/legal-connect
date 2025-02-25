import { border } from "@assets/style/boxStyles";
import { Box, Typography } from "@mui/material";

export type FormSection = {
  sectionId: string;
  label: string;
};

const FormNavBar = ({
  sections,
  activeSectionId,
}: {
  sections: FormSection[];
  activeSectionId: string;
}) => {
  return (
    <Box position="sticky" top="162px">
      {sections.map((section) => (
        <NavBarElement
          section={section}
          isActive={activeSectionId === section.sectionId}
        />
      ))}
    </Box>
  );
};

const NavBarElement = ({
  section,
  isActive,
}: {
  section: FormSection;
  isActive: boolean;
}) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: section.sectionId === "about" ? "end" : "center",
    });
  };
  return (
    <Box
      px="20px"
      py="10px"
      pr="50px"
      {...border}
      {...(section.sectionId === "contactInfo" && {
        borderTop: "none",
        borderBottom: "none",
      })}
      borderLeft={(theme) =>
        `2px solid ${
          isActive ? theme.palette.secondary.main : theme.palette.divider
        }`
      }
      sx={{
        transition: "all 0.25s",
        cursor: "pointer",
      }}
      onClick={() => scrollToSection(section.sectionId)}
    >
      <Typography variant="h6" {...(isActive && { color: "secondary" })}>
        {section.label}
      </Typography>
    </Box>
  );
};

export default FormNavBar;
