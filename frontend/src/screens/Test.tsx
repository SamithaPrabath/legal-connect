import MUIButton from "@components/MUIButton"
import { Box, Typography } from "@mui/material"

const Test = () => {
  return (
        <Box padding="10px">
            
            <Typography>Buttons</Typography>
            <Box mt={3} display="flex" flexWrap="wrap" gap="10px" alignItems="center">
                <MUIButton>Primary Regular</MUIButton>
                <MUIButton variant="outlined">Primary Outlined</MUIButton>
                <MUIButton color="secondary">Secondary Regular</MUIButton>
                <MUIButton color="secondary" variant="outlined">Secondary Outlined</MUIButton>
                <MUIButton size="small">Small Regular</MUIButton>
                <MUIButton size="small" variant="outlined">Small Outlined</MUIButton>
            </Box>
        </Box>
  )
}

export default Test
