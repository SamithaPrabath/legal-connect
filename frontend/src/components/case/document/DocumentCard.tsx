import { border } from '@assets/style/boxStyles';
import MUIButton from '@components/MUIButton'
import { Box, BoxProps, Typography } from '@mui/material'

type PropTypes = {
    label: string;
    userType: string;
    date: string;
    description: string
} & BoxProps

const DocumentCard = ({ label, userType, date, description, ...rest}: PropTypes) => {
  return (
    <Box display="flex" flexDirection="column" gap="10px" p="20px" {...border} {...rest}>
      <Typography variant='h4'>{label}</Typography>
      <Box display="flex" alignItems="center" justifyContent="start" gap="10px">
        <Typography sx={{fontWeight:500}}>by {userType}</Typography>
        <Typography variant='body2'>{date}</Typography>
      </Box>
      <Typography variant='body2'>{description}</Typography>
      <Box display="flex" gap="10px">
        <MUIButton color='secondary' variant='outlined' size='small'>Download</MUIButton>
        <MUIButton color='secondary' variant='outlined' size='small'>Replace</MUIButton>
      </Box>
    </Box>
  )
}

export default DocumentCard
