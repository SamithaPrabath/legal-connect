import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type PropTypes = {
    date: string;
    description: string
}

const TimeLineCard = ({date, description}: PropTypes) => {

  return (
    <Box color="#4CAF50" display="flex" alignItems="center" gap="10px" py="10px">
      <CheckCircle color="inherit" fontSize="medium" />
      <Box>
        <Typography variant="body2">{date}</Typography>
        <Typography>{description}</Typography>
      </Box>
    </Box>
  )
}

export default TimeLineCard
