import { border } from "@assets/style/boxStyles";
import ParentCard from "@components/ParentCard";
import { Box, Typography, useTheme } from "@mui/material";

const ScheduleCard = () => {
  return (
    <ParentCard title="Schedule" display="flex" flexWrap="wrap" alignContent="start" gap="20px" parentBoxProps={{mt:"30px"}}>
      <TimeCard time="08:00 AM" isActive eventTitle="Appointment" subtitle="Sarah John" />
      <TimeCard time="08:00 AM" />
      <TimeCard time="08:00 AM" />
      <TimeCard time="08:00 AM" />
      <TimeCard time="08:00 AM" />
      <TimeCard time="08:00 AM" />
      <TimeCard time="08:00 AM" />  
    </ParentCard>
  )
}

type TimeCardProps = {
    time: string,
    isActive?: boolean;
    eventTitle?: string;
    subtitle?: string
}

const TimeCard = ({time, isActive, eventTitle, subtitle}: TimeCardProps) => {

    return (
        <Box {...border} p="10px" width="200px" height="150px" bgcolor={isActive ? useTheme().palette.primary.light : "white"}  display="flex" flexDirection="column" justifyContent="space-between">
        <Typography variant="h5">{time}</Typography>
        <Box>
            <Typography variant="h4">{eventTitle}</Typography>
            <Typography variant="body2">{subtitle}</Typography>
        </Box>
    </Box>
    )

}

export default ScheduleCard
