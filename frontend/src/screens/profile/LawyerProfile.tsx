import { flexCenter } from "@assets/style/boxStyles";
import ImageCompo from "@components/ImageCompo";
import DetailText from "@components/lawyer/DetailText";
import RatingCard from "@components/lawyer/RatingCard";
import MUIButton from "@components/MUIButton";
import ProfileIDButton from "@components/ProfileIDButton";
import SectionNavBar, { Section } from "@components/SectionNavBar";
import StatusBox from "@components/StatusBox";
import SubHeader from "@components/SubHeader";
import { Language, LocationOn, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserInfoResponse, UserType } from "@type/User";
import {
  message_with_user_rotue,
  profile_about_route,
  profile_reviews_route,
} from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import { Outlet, useNavigate } from "react-router-dom";

type PropTypes = {
  userData: UserInfoResponse;
};

const LawyerProfile = ({ userData }: PropTypes) => {
  const navigate = useNavigate();
  const { id, basicInfo, rating, reviewCount } = userData;

  const localStorageHandler = new LocalStorageHandler();

  const userType = localStorageHandler.userType;

  const isThisUsersAccount = localStorageHandler.profileId === id;
  const isClientViewing = userType === UserType.CLIENT;
  const isAdminViewing = userType === UserType.ADMIN;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;

  const sections: Section[] = [
    { label: "About", contextPath: profile_about_route(id) },
    { label: "Reviews", contextPath: profile_reviews_route(id) },
  ];

  return (
    <Box
      {...flexCenter}
      alignItems="start"
      gap="40px"
      justifyContent="space-between"
      bgcolor="white"
    >
      <Box
        {...flexCenter}
        flexDirection="column"
        alignItems="start"
        pr="20px"
        pl="60px"
        gap="20px"
        width="20%"
        position="sticky"
        top="100px"
      >
        <ImageCompo
          base64String={basicInfo.image}
          width="120px"
          height="120px"
        />
        <Typography variant="h2">{fullName}</Typography>
        <StatusBox status={userData.status || null} />
        <Box>
          <DetailText Icon={Work} detail={basicInfo.occupation} />
          <DetailText Icon={LocationOn} detail={basicInfo.location} />
          <DetailText Icon={Language} detail={basicInfo.language} />
        </Box>
        <RatingCard
          rating={rating || 0}
          reviewCount={reviewCount || 0}
          flexDirection="column"
          alignItems="start"
          gap="5px"
        />
        <Box {...flexCenter} flexDirection="column" gap="10px" width="100%">
          {isThisUsersAccount && (
            <MUIButton fullWidth>Edit Profile Info</MUIButton>
          )}
          {isClientViewing && (
            <MUIButton
              fullWidth
              onClick={() => {
                navigate(message_with_user_rotue(id));
              }}
            >
              Message
            </MUIButton>
          )}
          {isClientViewing && (
            <MUIButton fullWidth variant="outlined" color="secondary">
              Schedule Appointment
            </MUIButton>
          )}

          {isAdminViewing && <MUIButton fullWidth>Verfiy Lawyer</MUIButton>}
          {isAdminViewing && (
            <MUIButton variant="outlined" color="secondary" fullWidth>
              Deny Lawyer
            </MUIButton>
          )}
          <ProfileIDButton profileId={id} fullWidth />
        </Box>
      </Box>
      <Box width="80%" pb="40px" pr="50px">
        <SubHeader height="100%" pt="40px" borderBottom="none" boxShadow="none">
          <SectionNavBar sections={sections} width="50%" />
        </SubHeader>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LawyerProfile;
