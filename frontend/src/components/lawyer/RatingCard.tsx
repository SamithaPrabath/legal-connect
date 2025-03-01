import { flexCenter } from '@assets/style/boxStyles';
import { Box, BoxProps, Rating, Typography } from '@mui/material';

type PropTypes = {
  rating: number;
  reviewCount: number;
  fontSize?: string,
} & BoxProps;

const RatingCard = ({ rating, reviewCount, fontSize, ...rest }: PropTypes) => {
  return (
    <Box {...flexCenter} gap="10px" {...rest}>
      <Rating value={rating} size="small" precision={0.5} readOnly />
      <Typography sx={{fontSize}} variant="body2">{`(${rating}/5 from ${reviewCount} reviews)`}</Typography>
    </Box>
  );
};

export default RatingCard;
