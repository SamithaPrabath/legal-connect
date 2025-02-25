import { flexCenter } from "@assets/style/boxStyles";
import About from "@components/account/About";
import BasicInformation from "@components/account/BasicInformation";
import ContactInformation from "@components/account/ContactInformation";
import MUIButton from "@components/MUIButton";
import SubHeader from "@components/SubHeader";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import SectionNavBar, { Section } from "../../components/SectionNavBar";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  updateUserAbout,
  updateUserBasicInfo,
  updateUserContactInfo,
} from "@redux/slices/user/form";
import { aboutKeyType, basicInfoKeyType, contactInorKeyType, UserType } from "@type/User";

const sections: Section[] = [
  { sectionId: "basicInfo", label: "Basic Information" },
  { sectionId: "contactInfo", label: "Contact Information" },
  { sectionId: "about", label: "About" },
];

const CreateAccount = () => {
  const [activeSection, setActiveSection] = useState("");
  const { form } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const handleBasicInfo = (name: string, value: string | null) => {
    const isBasicInfo = (obj: string): obj is basicInfoKeyType => typeof obj === "string";

    if(!isBasicInfo(name)) return;
    const basicInfo = { ...form.basicInfo };
    basicInfo[name] = value || "";
    dispatch(updateUserBasicInfo(basicInfo));
  };

  const handleContactInfo = (name: string, value: string | null) => {
    const isContactInfo = (obj: string): obj is contactInorKeyType => typeof obj === "string"
    if (!isContactInfo(name)) return;
    const contactInfo = { ...form.contactInfo };
    contactInfo[name] = value || "";
    dispatch(updateUserContactInfo(contactInfo));
  };

  const handleAbout = (name: string, value: string | null) => {
    const isAboutType = (obj: any): obj is aboutKeyType => typeof obj === "string";
    if (!form.about) return;
    if (!isAboutType(name)) return;
    let about = { ...form.about };

    if (name === "practiceAreas") {
      if (!value) return;
      const practiceAreas = [...about.practiceAreas];
      if (!practiceAreas.includes(value)) practiceAreas.push(value);
      about[name] = practiceAreas;
    }
    else about[name] = value || "";
    dispatch(updateUserAbout(about));
  };

  const removePracticeArea = (value: string) => {
    if (!form.about) return;
    const about = { ...form.about };
    const practiceAreas = [...about.practiceAreas];
    about.practiceAreas = practiceAreas.filter(practiceArea => practiceArea !== value);
    dispatch(updateUserAbout(about))
  }

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

    sections.forEach(({ sectionId }) => {
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
       {form.type === UserType.LAWYER && <SectionNavBar sections={sections} activeSectionId={activeSection} />}
        <Box
          maxWidth="1000px"
          minWidth="800px"
          display="flex"
          flexDirection="column"
          gap="20px"
          py="40px"
        >
          <BasicInformation form={form.basicInfo} handleData={handleBasicInfo} />
          <ContactInformation form={form.contactInfo} handleData={handleContactInfo} />
          {form.type === UserType.LAWYER && <About form={form.about} handleData={handleAbout} removePracticeArea={removePracticeArea}/>}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
