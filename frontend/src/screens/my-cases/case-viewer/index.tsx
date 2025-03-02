import { caseByIdAction } from "@actions/caseActions";
import { flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import SectionNavBar, { Section } from "@components/SectionNavBar";
import SubHeader from "@components/SubHeader";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { UserType } from "@type/User";
import {
  mycases_route,
  view_case_documents_route,
  view_case_events_route,
  view_case_notes_route,
  view_case_overview_route,
} from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Outlet, useNavigate, useParams } from "react-router-dom";

const CaseViewer = () => {
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

  console.log(params);
  return (
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
                <MUIButton variant="outlined" color="secondary" size="small">
                  Update Status
                </MUIButton>
                <MUIButton variant="outlined" color="secondary" size="small">
                  Create Event
                </MUIButton>
              </>
            )}
            <MUIButton variant="outlined" color="secondary" size="small">
              Upload Document
            </MUIButton>
          </Box>
        </Box>
        <Box px="30px" pt="30px">
          <SectionNavBar sections={sections} />
        </Box>
      </SubHeader>

      <Outlet />
    </Box>
  );
};

export default CaseViewer;
