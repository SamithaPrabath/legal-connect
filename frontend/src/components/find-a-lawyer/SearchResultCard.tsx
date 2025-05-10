import { border, boxShadow, flexCenter } from "@assets/style/boxStyles";
import ImageCompo from "@components/ImageCompo";
import DetailText from "@components/lawyer/DetailText";
import RatingCard from "@components/lawyer/RatingCard";
import MUIButton from "@components/MUIButton";
import StatusBox from "@components/StatusBox";
import { LocationOn, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserStatus } from "@type/User";
import {
  message_with_user_rotue,
  profile_about_route,
  schedule_appointment_route,
} from "@utils/context-paths";
import { useNavigate } from "react-router-dom";

type PropTypes = {
  id: string;
  image?: string;
  name: string;
  status: UserStatus;
  rating: number;
  reviewCount: number;
  occupation: string;
  location: string;
};

const SearchResultCard = ({
  id,
  image,
  location,
  name,
  status,
  occupation,
  rating,
  reviewCount,
}: PropTypes) => {
  const navigate = useNavigate();

  return (
    <Box
      {...border}
      {...boxShadow}
      p="20px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="8px"
    >
      <Box {...flexCenter} gap="20px">
        <ImageCompo base64String={image || null} width="150px" height="150px" />
        <Box>
          <Box display="flex" flexDirection="column" gap="5px" mb="5px">
            <Typography variant="h3">{name}</Typography>
            <StatusBox status={status} />
            <RatingCard rating={rating} reviewCount={reviewCount} />
          </Box>
          <Box>
            <DetailText Icon={Work} detail={occupation} />
            <DetailText Icon={LocationOn} detail={location} />
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="10px" minWidth="200px">
        <MUIButton
          fullWidth
          color="secondary"
          onClick={() => navigate(schedule_appointment_route(id))}
        >
          Schedule a Meeting
        </MUIButton>
        <MUIButton
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => navigate(message_with_user_rotue(id))}
        >
          Send Message
        </MUIButton>
        <MUIButton
          fullWidth
          variant="outlined"
          color="secondary"
          onClick={() => navigate(profile_about_route(id))}
        >
          View Profile
        </MUIButton>
      </Box>
    </Box>
  );
};

export default SearchResultCard;
