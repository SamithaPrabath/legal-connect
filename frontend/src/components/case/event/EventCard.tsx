import { border } from '@assets/style/boxStyles';
import { Box, Typography } from '@mui/material';

type PropTyps = {
    title: string;
    date: string;
    time: string;
    description: string
}

const EventCard = ({title, date, time, description}:PropTyps) => {
  return (
    <Box borderBottom={border.border} px="20px" py="15px">
        <Box display="flex" alignItems="center" justifyContent="start" gap="30px" mb="10px">
            <Typography variant='h3'>{title}</Typography>
            <Typography variant='h6' fontSize="12px">{new Date(date).toUTCString().substring(0,16)}, {time}</Typography>
        </Box>
        <Typography variant='body2'>{description}</Typography>
    </Box>
  )
}

export default EventCard
