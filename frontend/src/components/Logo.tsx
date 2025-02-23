import LogoImage from "@assets/images/logo.svg"
import { Box } from "@mui/material"

const Logo = () => {
  return (
    <Box height="100%" display="flex" justifyContent="center" alignItems="center">
      <img src={LogoImage} />
    </Box>
  )
}

export default Logo
