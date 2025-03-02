import ParentCard from "@components/ParentCard"
import { Box } from "@mui/material"
import CilentScheduleCard from '@components/schedule/CilentScheduleCard';
import LocalStorageHandler from "@utils/localStorageHandler";
import { UserType } from "@type/User";
import ScheduleCard from "./ScheduleCard";

const Schedule = () => {
  const userType = new LocalStorageHandler().userType;

  const schedules = [
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
    {dateTime: "Feb 15, 2025, 10:30 AM", eventTitle: "Hearing", caseName: "Johnson vs. Apex Corp."},
  ]

  return (
    <Box p="30px">
      <ParentCard title={userType === UserType.CLIENT ? "Schedule" : "Upcoming Events"} display="flex" gap="20px" flexWrap="wrap">
        {schedules.map(schedule => <CilentScheduleCard {...schedule}/>)}
      </ParentCard>
      {userType === UserType.LAWYER && <ScheduleCard />}
    </Box>
  )
}

export default Schedule
