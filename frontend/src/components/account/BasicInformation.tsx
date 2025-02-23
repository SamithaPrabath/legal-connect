import { Box, useTheme } from "@mui/material";
import InfoCard from "./InfoCard";
import DefaultProfile from "@assets/images/default_profile.png";
import MUIButton from "@components/MUIButton";
import FormField from "@components/FormField";

const BasicInformation = () => {
  const { divider } = useTheme().palette;
  const formRowFlexStyle = {
    gap: "20px",
    display: "flex",
  };

  const profileImageSectionStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: "10px",
    width: "15%",
    alignItems: "center",
    justifyContent: "start",
    py: "40px",
    px: "10px",
    borderRight: `1px solid ${divider}`,
  };

  return (
    <InfoCard id="basicInfo" title="Basic Information">
      <Box width="100%" display="flex">
        <Box {...profileImageSectionStyle}>
          <img src={DefaultProfile} width="100px" />
          <MUIButton variant="outlined" color="secondary">
            Upload
          </MUIButton>
        </Box>
        <Box
          width="85%"
          p="20px"
          display="flex"
          flexDirection="column"
        >
          <Box {...formRowFlexStyle}>
            <FormField fullWidth label="First Name" name="firstName" />
            <FormField fullWidth label="Last Name" name="lastName" />
          </Box>
          <FormField fullWidth label="Occupation" name="occupation" />
          <FormField fullWidth label="Language" name="language" />
          <Box {...formRowFlexStyle}>
            <FormField fullWidth label="Location" name="location" />
            <FormField fullWidth label="City" name="city" />
          </Box>
        </Box>
      </Box>
    </InfoCard>
  );
};

export default BasicInformation;
