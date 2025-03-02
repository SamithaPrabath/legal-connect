import { getEventsByCaseId, getTimeLineEventsByCaseId } from "@actions/eventAction";
import { border } from "@assets/style/boxStyles";
import ParentCard from "@components/ParentCard";
import EventCard from "@components/case/event/EventCard";
import TimeLineCard from "@components/case/event/TimeLineCard";
import { Box, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { tempGetAllEvents, tempGetAllTimeLineEvents } from "@temporaryActions/tempEventActions";
import { isBackendConnected } from "@utils/env-config";
import { useEffect } from "react";

const CaseEvents = () => {
  const dispatch = useAppDispatch();
  const { data: caseObj } = useAppSelector(state => state.case.case);
  const { data: eventList } = useAppSelector(state => state.event.list);
  const { data: timeLineEventList } = useAppSelector(state => state.event.timelineList);

  useEffect(() => {
    if (!caseObj) return;
    if (!isBackendConnected) return;
    dispatch(getEventsByCaseId(caseObj.id));
    dispatch(getTimeLineEventsByCaseId(caseObj.id));
  },[caseObj])

  useEffect(() => {
    if (isBackendConnected) return;
    dispatch(tempGetAllEvents());
    dispatch(tempGetAllTimeLineEvents());
  },[])


  return (
    <Box
      p="30px"
      display="flex"
      alignItems="start"
      justifyContent="center"
      gap="30px"
      height="100%"
    >
      <ParentCard title="Upcoming Events" parentBoxProps={{width:"80%"}}>
        {eventList?.map((event) => (
          <EventCard {...event} />
        ))}
      </ParentCard>
      <Box width="20%" bgcolor="white" {...border} p="20px" minHeight="500px">
        <Typography variant="h4" mb="20px">
          Timeline
        </Typography>
        {timeLineEventList?.map((event) => (
          <TimeLineCard {...event} />
        ))}
      </Box>
    </Box>
  );
};

export default CaseEvents;
