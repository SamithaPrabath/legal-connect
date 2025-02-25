import ParentCard from "@components/ParentCard"
import { Box } from "@mui/material"
import CilentScheduleCard from '@components/schedule/CilentScheduleCard';

const Schedule = () => {

  const schedules = [
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
  ]

  return (
    <Box p="30px">
      <ParentCard title="Schedule" display="flex" gap="20px" flexWrap="wrap">
        {schedules.map(schedule => <CilentScheduleCard {...schedule}/>)}
      </ParentCard>
    </Box>
  )
}

export default Schedule
