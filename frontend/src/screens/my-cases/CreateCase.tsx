import { flexCenter } from "@assets/style/boxStyles";
import CaseBasicInformation from "@components/case/BasicInformation";
import CaseClient from "@components/case/Client";
import CaseCourt from "@components/case/Court";
import CaseOppositionParty from "@components/case/OppositionParty";
import MUIButton from "@components/MUIButton";
import FormNavBar, { FormSection } from "@components/FormNavBar";
import SubHeader from "@components/SubHeader";
import { Box } from "@mui/material";
import { login_signup_route, mycases_route } from "@utils/context-paths";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CaseForm } from "@type/Case";
import { useAppSelector } from "@redux/hooks";
import LocalStorageHandler from "@utils/localStorageHandler";
import { caseCreateAction } from "@actions/caseActions";

const sections: FormSection[] = [
  { sectionId: "caseBasicInfo", label: "Basic Information" },
  { sectionId: "caseClient", label: "Client" },
  { sectionId: "caseOppositionParty", label: "Opposition Party" },
  { sectionId: "caseCourt", label: "Court" },
];

const initialState: CaseForm = {
  caseName:"",
  caseNumber: "",
  caseType: "",
  client: {
    id: "",
    name: "",
    email: "",
    phone: "",
  },
  court: {
    address: "",
    name: "",
    phone: ""
  },
  lawyerId: "",
  oppositionParty: {
    lawyerName:"",
    name:"",
    phone:""
  }
}

const CreateCase = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [caseForm, setCaseForm] = useState<CaseForm>(initialState);

  const navigate = useNavigate();

  const { data: userData } = useAppSelector(state => state.user.user)

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

  useEffect(() => {
    const localStorageHandler = new LocalStorageHandler();

    const profileId  = localStorageHandler.profileId;

    if (profileId)
      setCaseForm(prev => ({...prev, lawyerId: profileId}))
    else {
      localStorageHandler.removeAll();
      navigate(login_signup_route)
    }
  },[])

  useEffect(() => {
    if (userData) {
      setCaseForm(prev => ({
        ...prev,
        client: {
          id: userData.id,
          email: userData.contactInfo.email,
          name: userData.basicInfo.firstName + " " + userData.basicInfo.lastName,
          phone: userData.contactInfo.phone
        }
      }))
    }
  },[userData])


  const handleBasicInfo = (name: string, value: string | null) => {
    setCaseForm(prev => ({
      ...prev,
      [name]: value || ""
    }))
  }

  const handleClientInfo = (name: string , value: string | null) => {
    setCaseForm(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [name]: value || ""
      }
    }))
  };

  const handleOppositionPartyInfo = (name: string, value: string | null) => {
    setCaseForm(prev => ({
      ...prev,
      oppositionParty: {
        ...prev.oppositionParty,
        [name]: value || ""
      }
    }))
  }

  const handleCourtInfo = (name: string, value: string | null) => {
    setCaseForm(prev => ({
      ...prev,
      court: {
        ...prev.court,
        [name]: value || ""
      }
    }))
  }

  const handleSubmit = async() => {
    setLoading(true);
    await caseCreateAction({
      caseName: caseForm.caseName,
      caseNumber: caseForm.caseNumber,
      caseType: caseForm.caseType,
      clientId: caseForm.client.id,
      court: caseForm.court,
      lawyerId: caseForm.lawyerId,
      oppositionParty: caseForm.oppositionParty,
    })
    .then(() => {
      setLoading(false);
      navigate(mycases_route);
    }).catch(() => {
      setLoading(false);
    })
  }

  return (
    <Box>
      <SubHeader {...flexCenter} py="10px">
        <Box width="280px" {...flexCenter} gap="10px">
        <MUIButton onClick={handleSubmit} fullWidth loading={loading}>Create Case</MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary" onClick={() => navigate(mycases_route)}>
          Back
        </MUIButton>
        </Box>
      </SubHeader>
      <Box display="flex" justifyContent="center" alignItems="start" gap="20px">
        <FormNavBar sections={sections} activeSectionId={activeSection} />
        <Box
          maxWidth="1000px"
          minWidth="800px"
          display="flex"
          flexDirection="column"
          gap="20px"
          py="40px"
        >
          <CaseBasicInformation form={caseForm} handleChange={handleBasicInfo} />
          <CaseClient form={caseForm} handleChange={handleClientInfo} />
          <CaseOppositionParty form={caseForm} handleChange={handleOppositionPartyInfo} />
          <CaseCourt form={caseForm} handleChange={handleCourtInfo} />
        </Box>
      </Box>
    </Box>
  );
};

export default CreateCase;
