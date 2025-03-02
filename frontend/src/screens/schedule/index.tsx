import ParentCard from "@components/ParentCard"
import { Box } from "@mui/material"
import CilentScheduleCard from '@components/schedule/CilentScheduleCard';
import LocalStorageHandler from "@utils/localStorageHandler";
import { UserType } from "@type/User";
import ScheduleCard from "./ScheduleCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { getUpcomingEvents } from "@actions/eventAction";
import { isBackendConnected } from "@utils/env-config";
import { tempGetAllEvents } from "@temporaryActions/tempEventActions";

const Schedule = () => {
  const localStorageHandler = new LocalStorageHandler();
  const userType = localStorageHandler.userType;
  const userId = localStorageHandler.profileId;

  const dispatch = useAppDispatch();
  const { data: schedules } = useAppSelector(state => state.event.list);

  useEffect(() => {
    if (!userId) return;
    if (isBackendConnected) dispatch(getUpcomingEvents(userId));
    else dispatch(tempGetAllEvents());
  },[userId])

  return (
    <Box p="30px">
      <ParentCard title={userType === UserType.CLIENT ? "Schedule" : "Upcoming Events"} display="flex" gap="20px" flexWrap="wrap">
        {schedules?.map(schedule => <CilentScheduleCard {...schedule}/>)}
      </ParentCard>
      {userType === UserType.LAWYER && <ScheduleCard />}
    </Box>
  )
}

export default Schedule
