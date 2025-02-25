import { border } from "@assets/style/boxStyles";
import { Box, Typography } from "@mui/material";

type PropTypes = {
    label: string;
    title: string;
    detail1: string;
    detail2: string;
}

const CaseDetailCard = ({label, title, detail1, detail2}: PropTypes) => {
  return (
    <Box {...border} bgcolor="white" px="15px" py="20px">
      <Typography variant="h4" color="secondary" mb="20px">{label}</Typography>

      <Box display="flex" flexDirection="column" gap="5px" width="fit-content">
        <Typography variant="h3">{title}</Typography>
        <Typography variant="body2">{detail1}</Typography>
        <Typography variant="body2">{detail2}</Typography>
      </Box>
    </Box>
  )
}

export default CaseDetailCard
