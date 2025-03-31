import { border, flexCenter } from "@assets/style/boxStyles";
import { Box, Typography, useTheme } from "@mui/material";
import { CaseStatus } from "@type/Case";
import { UserType } from "@type/User";
import { mycases_route, view_case_overview_route } from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useLocation, useNavigate } from "react-router-dom";
import { getStatusChip } from "../../../screens/my-cases/utils";

type PropTypes = {
  caseId: string;
  caseName: string;
  lawyerName: string;
  assignedDate: string;
  caseType: string;
  caseStatus: CaseStatus;
};

const CaseCard = ({
  assignedDate,
  caseId,
  caseName,
  caseStatus,
  caseType,
  lawyerName,
}: PropTypes) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const caseDetails = [
    { label: "Assigned Date", value: assignedDate },
    { label: "Case Type", value: caseType },
    { label: "Case Status", value: getStatusChip(caseStatus, useTheme()) },
  ];

  const canClickable =
    UserType.CLIENT === new LocalStorageHandler().userType &&
    pathname === mycases_route;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      {...border}
      bgcolor="white"
      px="40px"
      py="15px"
      sx={{cursor: canClickable ? "pointer" : "auto"}}
      onClick={() => {
        if (canClickable) navigate(view_case_overview_route(caseId));
      }}
    >
      <Box {...flexCenter} flexDirection="column" alignItems="start" gap="5px">
        <Typography variant="h6">CASE-{caseId}</Typography>
        <Typography variant="h2">{caseName}</Typography>
        <Typography variant="h6" sx={{ fontSize: "16px" }}>
          {lawyerName}
        </Typography>
      </Box>
      <Box {...flexCenter} flexDirection="column" gap="5px">
        {caseDetails.map((detail) => (
          <CaseDetailSection {...detail} />
        ))}
      </Box>
    </Box>
  );
};

const CaseDetailSection = ({ label, value }: { label: string; value: any }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="250px"
    >
      <Box>
        <Typography variant="body2">{label}</Typography>
      </Box>
      <Box width="150px" display="flex" alignItems="center" gap="5px">
        <Typography>:</Typography>
        {typeof value === "string" ? <Typography>{value}</Typography> : value}
      </Box>
    </Box>
  );
};

export default CaseCard;
