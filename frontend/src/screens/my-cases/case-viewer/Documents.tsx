import ParentCard from "@components/ParentCard"
import DocumentCard from "@components/case/document/DocumentCard"
import MUIButton from "@components/MUIButton"
import { Box } from "@mui/material"

const CaseDocuments = () => {
  const documents = [
    {label: "Client Agreement", userType: "Lawyer", date: "Jan 15, 2025", description:"This is the signed agreement"},
    {label: "Client Agreement", userType: "Lawyer", date: "Jan 15, 2025", description:"This is the signed agreement"},
    {label: "Client Agreement", userType: "Lawyer", date: "Jan 15, 2025", description:"This is the signed agreement"},
    {label: "Client Agreement", userType: "Lawyer", date: "Jan 15, 2025", description:"This is the signed agreement"},
  ]
  return (
    <Box p="30px">
      <ParentCard title="Shared Documents" display="flex" flexWrap="wrap" alignContent="start" gap="20px" sideCompo={<MUIButton color="secondary" size="small">Upload Document</MUIButton>}>
        {documents.map(document => <DocumentCard width="29.5%" {...document} />)}
      </ParentCard>
    </Box>
  )
}

export default CaseDocuments
