import { flexCenter } from "@assets/style/boxStyles";
import About from "@components/account/About";
import BasicInformation from "@components/account/BasicInformation";
import ContactInformation from "@components/account/ContactInformation";
import MUIButton from "@components/MUIButton";
import SubHeader from "@components/SubHeader";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import FormNavBar, { FormSection } from "../../components/FormNavBar";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import {
  updateUserAbout,
  updateUserBasicInfo,
  updateUserContactInfo,
  updateUserType,
} from "@redux/slices/user/form";
import { aboutKeyType, basicInfoKeyType, contactInorKeyType, UserType } from "@type/User";
import { signupAction, updateUserAction } from "@actions/portalAction";
import { useNavigate, useParams } from "react-router-dom";
import { login_signup_route, profile_about_route } from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { getUserByProfileId } from "@actions/userActions";
import { signUpReset } from "@redux/slices/portal/signup";

const sections: FormSection[] = [
  { sectionId: "basicInfo", label: "Basic Information" },
  { sectionId: "contactInfo", label: "Contact Information" },
  { sectionId: "about", label: "About" },
];

const CreateAccount = () => {
  const [activeSection, setActiveSection] = useState("");
  const [id, setId] = useState<string | null>(null)

  const params = useParams();
  const { form } = useAppSelector((state) => state.user);
  const { success } = useAppSelector(state => state.portal.signup);
  const { data: userData } = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    if (!form.aboutInfo) return;
    if (!isAboutType(name)) return;
    let about = { ...form.aboutInfo };

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
    if (!form.aboutInfo) return;
    const about = { ...form.aboutInfo };
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

  useEffect(() => {
    if (success ) {
      dispatch(signUpReset());
      if (location.pathname.startsWith("/update") && params && params.id) 
        navigate(profile_about_route(params.id))
      else {
        // TODO: success message 
        navigate(login_signup_route)
      }
    }
  },[success])

  useEffect(() => {
    if (!form.type) {
      if (location.pathname.startsWith("/update")) {
        const localStoragehandler = new LocalStorageHandler();
        const userType = localStoragehandler.userType;
        const profileId = localStoragehandler.profileId;
        if (userType && profileId) {
          dispatch(updateUserType(userType))
          dispatch(getUserByProfileId(profileId))
        }
      }
      else navigate(login_signup_route)
    }
  },[]);

  useEffect(() => {
    if (!userData) return;
    dispatch(updateUserBasicInfo(userData.basicInfo))
    dispatch(updateUserContactInfo(userData.contactInfo))
    if (userData.aboutInfo) dispatch(updateUserAbout(userData.aboutInfo))
  },[userData])

  useEffect(() => {
    setId(params?.id || null)  
  },[params])

  const handleSubmit = () => {
    if (id) dispatch(updateUserAction(id))
    else dispatch(signupAction());
  }

  return (
    <Box>
      <SubHeader {...flexCenter} py="10px">
        <MUIButton onClick={handleSubmit}> {id ? "Update Account" : "Create Account"}</MUIButton>
      </SubHeader>
      <Box display="flex" justifyContent="center" alignItems="start" gap="20px">
       {form.type === UserType.LAWYER && <FormNavBar sections={sections} activeSectionId={activeSection} />}
        <Box
          maxWidth="1000px"
          minWidth="800px"
          display="flex"
          flexDirection="column"
          gap="20px"
          py="40px"
        >
          <BasicInformation userType={form.type!} form={form.basicInfo} handleData={handleBasicInfo} />
          <ContactInformation form={form.contactInfo} handleData={handleContactInfo} />
          {form.type === UserType.LAWYER && <About form={form.aboutInfo} handleData={handleAbout} removePracticeArea={removePracticeArea}/>}
        </Box>
      </Box>
    </Box>
  );
};

export default CreateAccount;
