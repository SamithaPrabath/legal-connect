import ImageCompo from "@components/ImageCompo";
import ParentCard from "@components/ParentCard";
import { Box, Rating, Typography } from "@mui/material";
import { ReviewResponse } from "@type/Review";

const LawyerProfileReviews = () => {
    const reviews: ReviewResponse[] = [
        {
          client: {
            profileId: 1,
            image: null,
            firstName: "John",
            lastName: "Doe",
          },
          date: "2024-03-01",
          rating: 5,
          title: "Excellent Service!",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vestibulum pulvinar sem, ac cursus arcu molestie quis. Nunc tristique urna nec fringilla maximus. Duis maximus nunc at justo consectetur cursus. Nam luctus, urna sit amet pharetra dictum, ex neque tincidunt ante, sed iaculis massa erat id nunc. Nullam pulvinar",
        },
        {
          client: {
            profileId: 2,
            image: null,
            firstName: "Jane",
            lastName: "Smith",
          },
          date: "2024-02-28",
          rating: 4,
          title: "Very Good Experience",
          description: "Great experience, but there’s room for improvement.",
        },
        {
          client: {
            profileId: 3,
            image: null,
            firstName: "David",
            lastName: "Johnson",
          },
          date: "2024-02-25",
          rating: 3,
          title: "Average Service",
          description: "It was okay, but I expected a bit more.",
        },
      ];

  return (
    <Box mt="20px">
      <ParentCard title="Reviews" titleVariant="h3">
        {reviews.map((review) => (
          <ReviewCard review={review} />
        ))}
      </ParentCard>
    </Box>
  );
};

const ReviewCard = ({ review }: { review: ReviewResponse }) => {
  const { client, date, rating, title, description } = review;

  const clientFullName = `${client.firstName} ${client.lastName}`;

  return (
    <Box display="flex" flexDirection="column" gap="10px" mt="30px">
      <Box display="flex" alignItems="start" gap="10px">
        <ImageCompo width="50px" height="50px" base64String={review.client.image} />
        <Box>
          <Typography variant="h4">{clientFullName}</Typography>
          <Typography variant="body2">{date}</Typography>
          <Box display="flex" alignItems="center" gap="10px">
            <Rating value={rating} readOnly size="small" />
            <Typography variant="body1" fontWeight={500}>{title}</Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

export default LawyerProfileReviews;
