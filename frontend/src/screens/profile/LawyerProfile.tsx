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
import { useAppDispatch } from "@redux/hooks";
import {
  updateUserAbout,
  updateUserBasicInfo,
  updateUserContactInfo,
  updateUserType,
} from "@redux/slices/user/form";
import { UserInfoResponse, UserType } from "@type/User";
import {
  admin_dashboard_route,
  message_with_user_rotue,
  profile_about_route,
  profile_reviews_route,
  schedule_appointment_route,
  update_account_route,
} from "@utils/context-paths";
import LocalStorageHandler from "@utils/localStorageHandler";
import Requests from "@utils/Requests";
import { verify_lawyer_url } from "@utils/urls/resources/user";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { deny_lawyer_url } from "../../utils/urls/resources/user";

type PropTypes = {
  userData: UserInfoResponse;
};

const LawyerProfile = ({ userData }: PropTypes) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [denyLoading, setDenyLoading] = useState(false);
  const { id, basicInfo, rating, reviewCount } = userData;

  const localStorageHandler = new LocalStorageHandler();

  const userType = localStorageHandler.userType;

  const isThisUsersAccount = localStorageHandler.profileId == id;
  const isClientViewing = userType === UserType.CLIENT;
  const isAdminViewing = userType === UserType.ADMIN;

  const fullName = `${basicInfo.firstName} ${basicInfo.lastName}`;

  const sections: Section[] = [
    { label: "About", contextPath: profile_about_route(id) },
    { label: "Reviews", contextPath: profile_reviews_route(id) },
  ];

  const verifyLawyer = async () => {
    setVerifyLoading(true);
    const request = new Requests(verify_lawyer_url(id));
    await request.put();
    setVerifyLoading(false);
    navigate(admin_dashboard_route);
  };

  const denyLawyer = async () => {
    setDenyLoading(true);
    const request = new Requests(deny_lawyer_url(id));
    await request.put();
    setDenyLoading(false);
    navigate(admin_dashboard_route);
  };

  const editLawyer = () => {
    dispatch(updateUserType(userData.type));
    if (userData.aboutInfo) dispatch(updateUserAbout(userData.aboutInfo));
    dispatch(updateUserBasicInfo(userData.basicInfo));
    dispatch(updateUserContactInfo(userData.contactInfo));

    navigate(update_account_route(id));
  };

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
            <MUIButton onClick={editLawyer} fullWidth>
              Edit Profile Info
            </MUIButton>
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
            <MUIButton
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={() => navigate(schedule_appointment_route(id))}
            >
              Schedule Appointment
            </MUIButton>
          )}

          {isAdminViewing && (
            <MUIButton loading={verifyLoading} onClick={verifyLawyer} fullWidth>
              Verfiy Lawyer
            </MUIButton>
          )}
          {isAdminViewing && (
            <MUIButton
              loading={denyLoading}
              onClick={denyLawyer}
              variant="outlined"
              color="secondary"
              fullWidth
            >
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
