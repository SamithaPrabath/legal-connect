import { border } from "@assets/style/boxStyles";
import { Box, Typography } from "@mui/material";
import { EventResponse } from "@type/Event";


const CilentScheduleCard = ({date, time, description, title, caseId}: EventResponse) => {
  return (
    <Box {...border} p="10px" width="200px" height="150px"  display="flex" flexDirection="column" justifyContent="space-between" sx={{":hover": {borderColor:"black", transition:"all 0.25s"}}}>
        <Typography variant="body2">{new Date(date).toUTCString().substring(0, 16)}, {time}</Typography>
        <Box>
            <Typography variant="h4">{title}</Typography>
            <Typography>{description}</Typography>
        </Box>
    </Box>
  )
}

export default CilentScheduleCard
