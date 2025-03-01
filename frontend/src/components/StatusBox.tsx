
import { flexCenter } from '@assets/style/boxStyles';
import { Circle } from '@mui/icons-material';
import { Box, lighten, Typography, useTheme } from '@mui/material';
import { UserStatus } from '@type/User';


const StatusBox = ({status}: {status: UserStatus | null}) => {

  if (!status) return null;

    const { primary, text} = useTheme().palette;

    const color = (status === UserStatus.AVAILABLE) ? primary.main : text.secondary

  return (
    <Box bgcolor={lighten(color, 0.9)} p="2px 5px" width="fit-content" {...flexCenter} gap="5px">
        <Circle sx={{fontSize:"5px", color}} />
        <Typography sx={{color, fontSize:"10px", fontWeight: 600}}>{status}</Typography>
    </Box>
  )
}

export default StatusBox
