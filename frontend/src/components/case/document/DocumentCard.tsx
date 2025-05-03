import * as documentActions from "@actions/documentActions";
import { border } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { Box, BoxProps, Typography } from "@mui/material";
import { CaseViewerContext } from "@screens/my-cases/case-viewer";
import { DocumentResponse } from "@type/Document";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useContext } from "react";

type PropTypes = {
  document: DocumentResponse;
} & BoxProps;

const DocumentCard = ({ document, ...rest }: PropTypes) => {
  const caseViewerContext = useContext(CaseViewerContext);

  if (!caseViewerContext) {
    return null; // or handle the null case appropriately
  }

  const {
    handleOpenDocumentModal,
    setDocumentEditMode,
    setSelectedDocuemntId,
  } = caseViewerContext;

  const localStorageHandler = new LocalStorageHandler();
  const isCurrentUser = document.userType === localStorageHandler.userType;

  const handleDownload = () => {
    documentActions.downloadDocument(document.id, document.fileName);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap="10px"
      p="20px"
      {...border}
      {...rest}
    >
      <Typography variant="h4">{document.title}</Typography>
      <Box display="flex" alignItems="center" justifyContent="start" gap="10px">
        <Typography sx={{ fontWeight: 500, textTransform: "capitalize" }}>
          by {isCurrentUser ? "Me" : document.userType}
        </Typography>
      </Box>
      <Typography variant="body2">{document.description}</Typography>
      <Box display="flex" gap="10px">
        <MUIButton
          color="secondary"
          variant="outlined"
          size="small"
          onClick={handleDownload}
        >
          Download
        </MUIButton>
        {isCurrentUser && (
          <MUIButton
            color="secondary"
            variant="outlined"
            size="small"
            onClick={() => {
              setSelectedDocuemntId(document.id);
              setDocumentEditMode(true);
              handleOpenDocumentModal(true, document);
            }}
          >
            Replace
          </MUIButton>
        )}
      </Box>
    </Box>
  );
};

export default DocumentCard;
