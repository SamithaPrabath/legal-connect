import DefaultProfile from "@assets/images/default_profile.png";
import { border, boxShadow, flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import StatusBox from "@components/StatusBox";
import { LocationOn, Work } from "@mui/icons-material";
import { Box, Rating, Typography, useTheme } from "@mui/material";
import { UserStatus } from "@type/User";
import { useEffect, useState } from "react";

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
  const [imageHeader, setImageHeader] = useState<string | null>(null);
  const [imageSizes, setImageSizes] = useState<{
    width: string;
    height: string;
  }>({ width: "100%", height: "" });

  useEffect(() => {
    if (!image) return;
    if (image.startsWith("/")) setImageHeader("data:image/jpeg;base64,");
    if (image.startsWith("i")) setImageHeader("data:image/png;base64,");
    getBase64ImageSize(image);
  }, [image]);

  const getBase64ImageSize = (base64String: string) => {
    return new Promise((_, reject) => {
      const img = new Image();
      img.onload = () => {
        if (img.width > img.height)
          setImageSizes({ width: "auto", height: "100%" });
        else setImageSizes({ width: "100%", height: "auto" });
      };
      img.onerror = reject;
      img.src = base64String;
    });
  };

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
        <Box
          width="150px"
          height="150px"
          borderRadius="50%"
          overflow="hidden"
          {...flexCenter}
        >
          <img
            src={imageHeader ? imageHeader + image : DefaultProfile}
            width={imageSizes.width}
            height={imageSizes.height}
          />
        </Box>
        <Box>
            <Box display="flex" flexDirection="column" gap="5px" mb="5px">
              <Typography variant="h3">{name}</Typography>
              <StatusBox status={status} />
              <Box {...flexCenter} gap="10px">
                  <Rating value={rating} size="small" precision={0.5} readOnly/>
                  <Typography variant="body2">{`(${rating}/5 from ${reviewCount} reviews)`}</Typography>
              </Box>
            </Box>
            <Box>
              <DetailText Icon={Work} detail={occupation} />
              <DetailText Icon={LocationOn} detail={location} />
            </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column" gap="10px" minWidth="200px">
        <MUIButton fullWidth color="secondary">Schedule a Meeting</MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary">Send Message</MUIButton>
        <MUIButton fullWidth variant="outlined" color="secondary">View Profile</MUIButton>
      </Box>
    </Box>
  );
};

const DetailText = ({
  Icon,
  detail,
}: {
  Icon: React.ElementType;
  detail: string;
}) => {

    const { text } = useTheme().palette;

  return (
    <Box color={text.secondary} fontSize="16px" {...flexCenter} justifyContent="start" gap="10px">
      <Icon fontSize="inherit" />
      <Typography variant="body2">{detail}</Typography>
    </Box>
  );
};

export default SearchResultCard;
