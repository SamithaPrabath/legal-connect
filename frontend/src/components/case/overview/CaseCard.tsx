import { Box, Typography, useTheme } from "@mui/material";
import { getStatusChip } from "../../../screens/my-cases/utils";
import { CaseStatus } from "@type/Case";
import { border, flexCenter } from "@assets/style/boxStyles";

const CaseCard = () => {

    const caseDetails = [
        { label: "Assigned Date", value: "Jan 5, 2025" },
        { label: "Case Type", value: "Corporate Dispute" },
        { label: "Case Status", value: getStatusChip(CaseStatus.IN_PROGRESS, useTheme()) },
    ]

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" {...border} bgcolor="white" px="40px" py="15px">
      <Box {...flexCenter} flexDirection="column" alignItems="start" gap="5px">
        <Typography variant="h6">CASE-10001</Typography>
        <Typography variant="h2">Johnson vs. Apex Corp.</Typography>
        <Typography variant="h6" sx={{fontSize:"16px"}}>Sarah Johnson</Typography>
      </Box>
      <Box {...flexCenter} flexDirection="column" gap="5px">
        {caseDetails.map(detail => <CaseDetailSection {...detail} />)}
      </Box>
    </Box>
  );
};

const CaseDetailSection = ({
  label,
  value,
}: {
  label: string;
  value: any;
}) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="250px">
      <Box>
        <Typography variant="body2">{label}</Typography>
      </Box>
      <Box width="150px" display="flex" alignItems="center" gap="5px">
      <Typography>:</Typography>{typeof value === "string" ? <Typography>{value}</Typography>: value}
      </Box>
    </Box>
  );
};

export default CaseCard;
