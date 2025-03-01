import CaseCard from '@components/case/overview/CaseCard'
import ParentCard from '@components/ParentCard'
import { Box } from '@mui/material'

const MyCasesClient = () => {
  return (
    <Box p="30px">
        <ParentCard title='My Cases' flexDirection="column" display="flex" gap="20px">
        <CaseCard />
        <CaseCard />
        <CaseCard />
        </ParentCard>
    </Box>
  )
}

export default MyCasesClient
