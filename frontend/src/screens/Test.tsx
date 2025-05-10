import FormField from "@components/FormField"
import MUIButton from "@components/MUIButton"
import { Box, styled, Typography } from "@mui/material"

const FlexBox = styled(Box)(() => ({
  marginTop:10,
  marginBottom:40,
  display:"flex",
  flexWrap:"wrap",
  gap:"10px",
  alignItems:"center",
}))

const Test = () => {
  return (
        <Box padding="10px">
            <Typography>Buttons</Typography>
            <FlexBox>
                <MUIButton>Primary Regular</MUIButton>
                <MUIButton variant="outlined">Primary Outlined</MUIButton>
                <MUIButton color="secondary">Secondary Regular</MUIButton>
                <MUIButton color="secondary" variant="outlined">Secondary Outlined</MUIButton>
                <MUIButton size="small">Small Regular</MUIButton>
                <MUIButton size="small" variant="outlined">Small Outlined</MUIButton>
            </FlexBox>
            <Typography>TextField</Typography>
            <FlexBox>
                <FormField label="Text Field" name="textField" placeholder="text field" />
            </FlexBox>
        </Box>
  )
}

export default Test
