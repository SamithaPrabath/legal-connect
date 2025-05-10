import CaseCard from "@components/case/overview/CaseCard";
import CaseDetailCard from "@components/case/overview/CaseDetailCard";
import { Box } from "@mui/material";
import { useAppSelector } from "@redux/hooks";
import { CaseStatus } from "@type/Case";

const CaseOverview = () => {
  const { data: caseObj } = useAppSelector((state) => state.case.case);

  return (
    <Box px="30px" display="flex" flexDirection="column" gap="20px" py="30px">
      <CaseCard
        assignedDate={caseObj?.createdDate.substring(0,10) || ""}
        caseId={`${caseObj?.id}` || ""}
        caseName={caseObj?.caseName || ""}
        caseStatus={caseObj?.caseStatus as CaseStatus}
        caseType={caseObj?.caseType || ""}
        lawyerName={caseObj?.lawyer?.basicInfo.firstName + " " + caseObj?.lawyer?.basicInfo.lastName}
      />
      <CaseDetailCard
        label="Client"
        title={caseObj?.client?.basicInfo?.firstName + " " + caseObj?.client?.basicInfo?.lastName}
        detail1={caseObj?.client.contactInfo?.phone || ""}
        detail2={caseObj?.client.contactInfo?.email || ""}
      />
      <CaseDetailCard
        label="Oppostion Party"
        title={caseObj?.oppositionParty.name || ""}
        detail1={caseObj?.oppositionParty.phone || ""}
        detail2={`Lawyer: ${caseObj?.oppositionParty.lawyerName}`}
      />
      <CaseDetailCard
        label="Court"
        title={caseObj?.court.name || ""}
        detail1={caseObj?.court.phone || ""}
        detail2={caseObj?.court.address || ""}
      />
    </Box>
  );
};

export default CaseOverview;
