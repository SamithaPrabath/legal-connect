import { border } from "@assets/style/boxStyles";
import ParentCard from "@components/ParentCard";
import EventCard from "@components/case/event/EventCard";
import TimeLineCard from "@components/case/event/TimeLineCard";
import { Box, Typography } from "@mui/material";

const CaseEvents = () => {
  const events = [
    {
      title: "Hearing",
      date: "Feb 15, 2025, 10:30 AM",
      description: "Prepare argument summary and attend the court hearing.",
    },
    {
      title: "Document Submission",
      date: "Feb 15, 2025, 10:30 AM",
      description: "Prepare argument summary and attend the court hearing.",
    },
    {
      title: "Mediation",
      date: "Feb 15, 2025, 10:30 AM",
      description: "Prepare argument summary and attend the court hearing.",
    },
  ];

  const timelineEvents = [
    { date: "Jan 5, 2025", description: "Case assigned to Sarah Johnson" },
    { date: "Jan 5, 2025", description: "Case assigned to Sarah Johnson" },
    { date: "Jan 5, 2025", description: "Case assigned to Sarah Johnson" },
    { date: "Jan 5, 2025", description: "Case assigned to Sarah Johnson" },
  ];

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
        {events.map((event) => (
          <EventCard {...event} />
        ))}
      </ParentCard>
      <Box width="20%" bgcolor="white" {...border} p="20px" minHeight="500px">
        <Typography variant="h4" mb="20px">
          Timeline
        </Typography>
        {timelineEvents.map((event) => (
          <TimeLineCard {...event} />
        ))}
      </Box>
    </Box>
  );
};

export default CaseEvents;
