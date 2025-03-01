import { flexCenter } from '@assets/style/boxStyles';
import { Box, BoxProps, Rating, Typography } from '@mui/material';

type PropTypes = {
  rating: number;
  reviewCount: number;
} & BoxProps;

const RatingCard = ({ rating, reviewCount, ...rest }: PropTypes) => {
  return (
    <Box {...flexCenter} gap="10px" {...rest}>
      <Rating value={rating} size="small" precision={0.5} readOnly />
      <Typography variant="body2">{`(${rating}/5 from ${reviewCount} reviews)`}</Typography>
    </Box>
  );
};

export default RatingCard;
