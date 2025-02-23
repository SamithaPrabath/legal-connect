import { flexCenter } from '@assets/style/boxStyles'
import About from '@components/account/About'
import BasicInformation from '@components/account/BasicInformation'
import ContactInformation from '@components/account/ContactInformation'
import MUIButton from '@components/MUIButton'
import SubHeader from '@components/SubHeader'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import SectionNavBar from './SectionNavBar'


export type AccountSection = {
    sectionId: string;
    label: string;
}

const sections: AccountSection[] = [
    { sectionId: "basicInfo", label: "Basic Information"},
    { sectionId: "contactInfo", label: "Contact Information"},
    { sectionId: "about", label: "About"},
]

const CreateAccount = () => {

    const [activeSection, setActiveSection] = useState("");


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting);
        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      { threshold: 0.5 } // Adjust threshold to control when section is considered "active"
    );

    sections.forEach(({sectionId}) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);


  return (
    <Box>
        <SubHeader {...flexCenter} py="10px">
            <MUIButton>Create Account</MUIButton>
        </SubHeader>
        <Box display="flex" justifyContent="center" alignItems="start" gap="20px">
          <SectionNavBar sections={sections} activeSectionId={activeSection} />
          <Box maxWidth="1000px" minWidth="800px" display="flex" flexDirection="column" gap="20px" py="40px">
              <BasicInformation />
              <ContactInformation />
              <About />
          </Box>
        </Box>
    </Box>
  )
}

export default CreateAccount
