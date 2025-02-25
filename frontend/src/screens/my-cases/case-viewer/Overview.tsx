import CaseCard from "@components/case/overview/CaseCard"
import CaseDetailCard from "@components/case/overview/CaseDetailCard"
import { Box } from "@mui/material"

const CaseOverview = () => {
  return (
    <Box px="30px" display="flex" flexDirection="column" gap="20px" py="30px">
      <CaseCard />
      <CaseDetailCard label="Client" title="Emily Johnson" detail1="+1 (555) 789-1234" detail2="emily.johnson@example.com" />
      <CaseDetailCard label="Oppostion Party" title="Apex Corp." detail1="+1 (555) 789-1234" detail2="emily.johnson@example.com" />
      <CaseDetailCard label="Court" title="New York Superior Court" detail1="+1 (555) 789-1234" detail2="emily.johnson@example.com" />
    </Box>
  )
}

export default CaseOverview
