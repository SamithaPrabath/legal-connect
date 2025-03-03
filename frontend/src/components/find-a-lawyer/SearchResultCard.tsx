import { border, boxShadow, flexCenter } from "@assets/style/boxStyles";
import ImageCompo from "@components/ImageCompo";
import DetailText from "@components/lawyer/DetailText";
import RatingCard from "@components/lawyer/RatingCard";
import MUIButton from "@components/MUIButton";
import StatusBox from "@components/StatusBox";
import { LocationOn, Work } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserStatus } from "@type/User";

type PropTypes = {
  image?: string;
  name: string;
  status: UserStatus;
  rating: number;
  reviewCount: number;
  occupation: string;
  location: string;
};

const SearchResultCard = ({
  image,
  location,
  name,
  status,
  occupation,
  rating,
  reviewCount,
}: PropTypes) => {
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
        <MUIButton fullWidth color="secondary">
          Schedule a Meeting
        </MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary">
          Send Message
        </MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary">
          View Profile
        </MUIButton>
      </Box>
    </Box>
  );
};

export default SearchResultCard;
