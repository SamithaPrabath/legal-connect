import { flexCenter } from "@assets/style/boxStyles";
import ImageCompo from "@components/ImageCompo";
import DetailText from "@components/lawyer/DetailText";
import RatingCard from "@components/lawyer/RatingCard";
import MUIButton from "@components/MUIButton";
import SectionNavBar, { Section } from "@components/SectionNavBar";
import StatusBox from "@components/StatusBox";
import SubHeader from "@components/SubHeader";
import { Language, LocationOn, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserInfoResponse } from "@type/User";
import {
  profile_about_route,
  profile_reviews_route,
} from "@utils/context-paths";
import { Outlet } from "react-router-dom";

type PropTypes = {
  userData: UserInfoResponse;
};

const LawyerProfile = ({ userData }: PropTypes) => {
  const { profileId, basicInfo, rating, reviewCount } = userData;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;

  const sections: Section[] = [
    { label: "About", contextPath: profile_about_route(profileId) },
    { label: "Reviews", contextPath: profile_reviews_route(profileId) },
  ];

  return (
    <Box {...flexCenter} alignItems="start" gap="40px" justifyContent="space-between" bgcolor="white">
      <Box {...flexCenter} flexDirection="column"  alignItems="start" p="20px" pl="60px" gap="20px" width="20%" position="sticky" top="70px">
        <ImageCompo base64String={basicInfo.image} width="120px" height="120px" />
        <Typography variant="h2">{fullName}</Typography>
        <StatusBox status={userData.userStatus || null} />
        <Box>
          <DetailText Icon={Work} detail={basicInfo.occupation} />
          <DetailText Icon={LocationOn} detail={basicInfo.location} />
          <DetailText Icon={Language} detail={basicInfo.language} />
        </Box>
        {rating && reviewCount && (
          <RatingCard rating={rating} reviewCount={reviewCount} flexDirection="column" alignItems="start" gap="5px" />
        )}
        <ClientButtons />
      </Box>
      <Box width="80%" pb="40px" pr="50px" >
        <SubHeader height="100%" pt="40px" borderBottom="none" boxShadow="none">
        <SectionNavBar sections={sections} width="50%" />
        </SubHeader>
        <Outlet />
      </Box>
    </Box>
  );
};

const LawyerButtons = () => (
  <Box>
    <MUIButton>Edit Profile Info</MUIButton>
    <MUIButton>Profile ID: 12345</MUIButton>
  </Box>
);

const ClientButtons = () => (
  <Box {...flexCenter} flexDirection="column" gap="10px" width="100%">
    <MUIButton fullWidth>Message</MUIButton>
    <MUIButton fullWidth variant="outlined" color="secondary">
      Schedule Appointment
    </MUIButton>
    <MUIButton fullWidth variant="outlined" color="secondary">
      Profile ID: 12344
    </MUIButton>
  </Box>
);

const AdminButtons = () => (
  <Box>
    <MUIButton>Verfiy Lawyer</MUIButton>
    <MUIButton>Deny Lawyer</MUIButton>
    <MUIButton>Profile ID: 12344</MUIButton>
  </Box>
);

export default LawyerProfile;
