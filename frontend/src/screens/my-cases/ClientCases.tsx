import { caseListAction } from "@actions/caseActions";
import CaseCard from "@components/case/overview/CaseCard";
import ParentCard from "@components/ParentCard";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetAllCasesList } from "@temporaryActions/tempCaseActions";
import { CaseStatus } from "@type/Case";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect } from "react";

const MyCasesClient = () => {
  const { data: casesList } = useAppSelector((state) => state.case.list);

  const dispatch = useAppDispatch();
  const userId = new LocalStorageHandler().profileId;

  useEffect(() => {
    if (!userId) return;
    if(isBackendConnected) dispatch(caseListAction(userId));
    else dispatch(tempGetAllCasesList());
  }, [userId]);

  return (
    <Box p="30px">
      <ParentCard
        title="My Cases"
        flexDirection="column"
        display="flex"
        gap="20px"
      >
        {casesList?.map((caseObj) => (
          <CaseCard
            assignedDate={caseObj?.createdDate || ""}
            caseId={caseObj?.id || ""}
            caseName={caseObj?.caseName || ""}
            caseStatus={caseObj?.caseStatus as CaseStatus}
            caseType={caseObj?.caseType || ""}
            lawyerName={
              caseObj?.lawyer?.basicInfo.firstName +
              " " +
              caseObj?.lawyer?.basicInfo.lastName
            }
          />
        ))}
      </ParentCard>
    </Box>
  );
};

export default MyCasesClient;
