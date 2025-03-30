import { caseByIdAction, caseUpdateStatusAction } from "@actions/caseActions";
import { replaceDocument, uploadDocument } from "@actions/documentActions";
import { flexCenter } from "@assets/style/boxStyles";
import FormField from "@components/FormField";
import MUIButton from "@components/MUIButton";
import MUIModel from "@components/MUIModal";
import SectionNavBar, { Section } from "@components/SectionNavBar";
import SubHeader from "@components/SubHeader";
import { AttachFile } from "@mui/icons-material";
import { Box, MenuItem, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { CaseStatus } from "@type/Case";
import { DocumentRequest } from "@type/Document";
import { UserType } from "@type/User";
import {
  mycases_route,
  schedule_appointment_route,
  view_case_documents_route,
  view_case_events_route,
  view_case_notes_route,
  view_case_overview_route,
} from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { createContext } from "react";

interface CaseViewerContextType {
  handleOpenDocumentModal: () => void;
  setDocumentEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDocuemntId: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CaseViewerContext = createContext<CaseViewerContextType | null>(null);

const CaseViewer = () => {
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [documentEditMode, setDocumentEditMode] = useState(false);
  const [selectedDocuementId, setSelectedDocuemntId] = useState<string | null>(null)
  const [openDocumentModel, setOpenDocumentModal] = useState(false);
  const [status, setStatus] = useState<CaseStatus>(CaseStatus.IN_PROGRESS);

  const [document, setDocument] = useState<DocumentRequest>({
    caseId: "",
    description: "",
    file: "",
    fileName: "",
    title: "",
    userType: "" as UserType,
  })

  const params = useParams();
  const caseId = params?.caseId as string;
  const sections: Section[] = [
    { label: "Overview", contextPath: view_case_overview_route(caseId) },
    { label: "Events", contextPath: view_case_events_route(caseId) },
    { label: "Documents", contextPath: view_case_documents_route(caseId) },
    { label: "Notes", contextPath: view_case_notes_route(caseId) },
  ];

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const userType = new LocalStorageHandler().userType;
  const { data: caseObj } = useAppSelector((state) => state.case.case);

  useEffect(() => {
    if (!caseId) return;
    dispatch(caseByIdAction(caseId));
  }, [caseId]);

  useEffect(() => {
    if (!caseObj) return;
    setStatus(caseObj.caseStatus);
    handleDocument("caseId", caseObj.id)
  }, [caseObj]);

  useEffect(() => {
    handleDocument("userType", userType)
  },[userType])

  const handleDocument = (name: string, value: string | null) => {
    setDocument(prev => ({
      ...prev,
      [name]: value || ""
    }))
  }

  const submitStatus = () => {
    if (!caseObj) return;
    dispatch(caseUpdateStatusAction(caseObj.id, status));
    handleCloseStatusModal();
  };

  const handleOpenStatusModal = () => {
    setOpenStatusModal(true);
  };

  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
  };

  const handleOpenDocumentModal = () => {
    setOpenDocumentModal(true);
  };

  const handleCloseDocumentModal = () => {
    setOpenDocumentModal(false);
  };


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleDocument("file", base64String)
        handleDocument("fileName", file.name);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleFileSubmit = () => {
    const documentToBeUploaded = {...document, file: document.file.split(",")[1]}
      if (documentEditMode && selectedDocuementId) dispatch(replaceDocument(selectedDocuementId, documentToBeUploaded))
      else dispatch(uploadDocument(documentToBeUploaded));
      setDocumentEditMode(false);
      handleCloseDocumentModal();
  }

  return (
    <CaseViewerContext.Provider value={{handleOpenDocumentModal, setDocumentEditMode, setSelectedDocuemntId}} >
      <Box height="100%">
      <SubHeader pt="10px" boxShadow="none" height="fit-content">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px="30px"
        >
          <Box {...flexCenter} gap="15px">
            <Box {...flexCenter} gap="5px">
              <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => navigate(mycases_route)}
              >
                My Cases
              </Typography>
              <MdKeyboardArrowRight fontSize="24px" />
              <Typography>{params.caseId}</Typography>
            </Box>
            <Typography variant="h4">{caseObj?.caseName}</Typography>
          </Box>
          <Box {...flexCenter} gap="10px">
            {userType === UserType.LAWYER && (
              <>
                <MUIButton
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={handleOpenStatusModal}
                >
                  Update Status
                </MUIButton>
                <MUIButton variant="outlined" color="secondary" size="small" onClick={() => navigate(schedule_appointment_route(caseId))}>
                  Create Event
                </MUIButton>
              </>
            )}
            <MUIButton variant="outlined" color="secondary" size="small" onClick={handleOpenDocumentModal}>
              Upload Document
            </MUIButton>
          </Box>
        </Box>
        <Box px="30px" pt="30px">
          <SectionNavBar sections={sections} />
        </Box>
      </SubHeader>
      <MUIModel
        onClick={submitStatus}
        title="Change Status"
        open={openStatusModal}
        onClose={handleCloseStatusModal}
      >
        <FormField
          fullWidth
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as CaseStatus)}
          select
        >
          <MenuItem value={CaseStatus.IN_PROGRESS}>In Progress</MenuItem>
          <MenuItem value={CaseStatus.AWAIT_HEARING}>Await Hearing</MenuItem>
          <MenuItem value={CaseStatus.ON_HOLD}>On Hold</MenuItem>
          <MenuItem value={CaseStatus.CLOSED}>Closed</MenuItem>
        </FormField>
      </MUIModel>

      <MUIModel
        onClick={handleFileSubmit}
        title="Upload Document"
        open={openDocumentModel}
        onClose={handleCloseDocumentModal}
      >
        <FormField fullWidth label="Title" name="title" value={document.title} handleChange={handleDocument} />
        <FormField fullWidth label="description" name="description" value={document.description} handleChange={handleDocument} />
        <Box {...flexCenter} width="100%" justifyContent="start" gap="10px">
          <MUIButton
            size="small"
            variant="outlined"
            color="secondary"
            sx={{ width: "fit-content", borderRadius: "5px" }}
            component="label"
          >
            <AttachFile sx={{ fontSize: "20px", mr: "5px" }} /> Attach Files
            <input
              type="file"
              accept="application/pdf"
              hidden
              onChange={handleFileUpload}
            />
          </MUIButton>
          <Box>
            <Typography>{document.fileName}</Typography>
          </Box>
        </Box>
      </MUIModel>
      <Outlet />
    </Box>
    </CaseViewerContext.Provider>
  );
};

export default CaseViewer;
