import { border, flexCenter } from "@assets/style/boxStyles"
import ContactInformation from "@components/account/ContactInformation"
import ImageCompo from "@components/ImageCompo"
import MUIButton from "@components/MUIButton"
import ProfileIDButton from "@components/ProfileIDButton"
import SubHeader from "@components/SubHeader"
import { Box, Typography, useTheme } from "@mui/material"
import { UserInfoResponse } from "@type/User"
import { update_account_route } from "@utils/context-paths"
import LocalStorageHandler from "@utils/localStorageHandler"
import { useNavigate } from "react-router-dom"


type PropTypes = {
    userData: UserInfoResponse
}

const ClientProfile = ({userData}:PropTypes) => {
    const navigate = useNavigate();
    const { text } = useTheme().palette;
    const { basicInfo, contactInfo } = userData;

  return (
    <Box>
        <SubHeader py="10px" {...flexCenter} gap="10px">
            {userData.id == new LocalStorageHandler().profileId && <MUIButton onClick={() => navigate(update_account_route(userData.id))}>Edit Profile Info</MUIButton>}
            <ProfileIDButton profileId={userData.id} variant={undefined}/>
        </SubHeader>
      <Box py="30px" display="flex" flexDirection="column" gap="30px" maxWidth="800px" margin="auto">
          <Box bgcolor="white" {...flexCenter} {...border} flexDirection="column" py="30px" gap="5px">
              <ImageCompo base64String={basicInfo.image} width="150px" height="150px" />
              <Typography variant="h2" mb="10px">{`${basicInfo.firstName} ${basicInfo.lastName}`}</Typography>
              <Typography variant="h4" sx={{color: text.secondary}} >{basicInfo.occupation}</Typography>
              <Typography variant="h6" sx={{color: text.secondary}} >{basicInfo.location}</Typography>
          </Box>
          <ContactInformation form={contactInfo} readonly  />
      </Box>
    </Box>
  )
}



export default ClientProfile
