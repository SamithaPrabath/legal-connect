import { border } from "@assets/style/boxStyles";
import { Box, Typography } from "@mui/material";

type PropType = {
    dateTime: string;
    eventTitle: string;
    caseName: string;
}

const CilentScheduleCard = ({dateTime, eventTitle, caseName}: PropType) => {
  return (
    <Box {...border} p="10px" width="200px" height="150px"  display="flex" flexDirection="column" justifyContent="space-between" sx={{":hover": {borderColor:"black", transition:"all 0.25s"}}}>
        <Typography variant="body2">{dateTime}</Typography>
        <Box>
            <Typography variant="h4">{eventTitle}</Typography>
            <Typography>{caseName}</Typography>
        </Box>
    </Box>
  )
}

export default CilentScheduleCard
