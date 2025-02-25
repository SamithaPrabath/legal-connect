import { flexCenter } from "@assets/style/boxStyles";
import CaseBasicInformation from "@components/case/BasicInformation";
import CaseClient from "@components/case/Client";
import CaseCourt from "@components/case/Court";
import CaseOppositionParty from "@components/case/OppositionParty";
import MUIButton from "@components/MUIButton";
import SectionNavBar, { Section } from "@components/SectionNavBar";
import SubHeader from "@components/SubHeader";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const sections: Section[] = [
  { sectionId: "caseBasicInfo", label: "Basic Information" },
  { sectionId: "caseClient", label: "Client" },
  { sectionId: "caseOppositionParty", label: "Opposition Party" },
  { sectionId: "caseCourt", label: "Court" },
];

const CreateCase = () => {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.9 }
    );

    sections.forEach(({ sectionId }) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box>
      <SubHeader {...flexCenter} py="10px">
        <Box width="280px" {...flexCenter} gap="10px">
        <MUIButton fullWidth>Create Case</MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary">
          Back
        </MUIButton>
        </Box>
      </SubHeader>
      <Box display="flex" justifyContent="center" alignItems="start" gap="20px">
        <SectionNavBar sections={sections} activeSectionId={activeSection} />
        <Box
          maxWidth="1000px"
          minWidth="800px"
          display="flex"
          flexDirection="column"
          gap="20px"
          py="40px"
        >
          <CaseBasicInformation />
          <CaseClient />
          <CaseOppositionParty />
          <CaseCourt />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCase;
