import { getDocumentsByCaseId } from "@actions/documentActions";
import DocumentCard from "@components/case/document/DocumentCard";
import MUIButton from "@components/MUIButton";
import ParentCard from "@components/ParentCard";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetDocumentsByCaseId } from "@temporaryActions/tempDocumentActions";
import { isBackendConnected } from "@utils/env-config";
import { useContext, useEffect } from "react";
import { CaseViewerContext } from ".";

const CaseDocuments = () => {
  const caseViewerContext = useContext(CaseViewerContext);
  
    if (!caseViewerContext) {
      return null; // or handle the null case appropriately
    }
  
    const {
      handleOpenDocumentModal
    } = caseViewerContext;

  const dispatch = useAppDispatch();
  const { data: documents } = useAppSelector((state) => state.document.list);

  const { data: caseObj } = useAppSelector((state) => state.case.case);

  useEffect(() => {
    if (!caseObj) return;
    if (isBackendConnected) dispatch(getDocumentsByCaseId(caseObj.id));
    else dispatch(tempGetDocumentsByCaseId());
  }, [dispatch, caseObj]);

  return (
    <Box p="30px">
      <ParentCard
        title="Shared Documents"
        display="flex"
        flexWrap="wrap"
        alignContent="start"
        gap="20px"
        sideCompo={
          <MUIButton color="secondary" size="small" onClick={() => handleOpenDocumentModal(false)}>
            Upload Document
          </MUIButton>
        }
      >
        {documents?.map((document) => (
          <DocumentCard key={document.id} width="29.5%" document={document} />
        ))}
      </ParentCard>
    </Box>
  );
};

export default CaseDocuments;
