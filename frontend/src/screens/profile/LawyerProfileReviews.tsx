import {
  addReviewAction,
  reviewListAction,
  reviewSummaryAction,
} from "@actions/reviewActions";
import { getUserByProfileId } from "@actions/userActions";
import FormField from "@components/FormField";
import ImageCompo from "@components/ImageCompo";
import RatingCard from "@components/lawyer/RatingCard";
import MUIButton from "@components/MUIButton";
import ParentCard from "@components/ParentCard";
import { Star } from "@mui/icons-material";
import { Box, Grid, LinearProgress, Rating, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { reviewListReset } from "@redux/slices/review/list";
import { reviewSummaryReset } from "@redux/slices/review/reviewSummary";
import {
  tempReviewListAction,
  tempReviewSummaryAction
} from "@temporaryActions/tempReviewActions";
import { ReviewRequest, ReviewResponse } from "@type/Review";
import { UserType } from "@type/User";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";

const LawyerProfileReviews = () => {
  const dispatch = useAppDispatch();

  const { data: userData } = useAppSelector((state) => state.user.user);
  const { data: reviews } = useAppSelector((state) => state.review.list);
  const { success: reviewCreateSuccess } = useAppSelector(state => state.review.create);

  const userType = new LocalStorageHandler().userType;

  useEffect(() => {
    if (!isBackendConnected) return;
    if (!userData) return;
    dispatch(reviewListAction(userData.id));
    dispatch(reviewSummaryAction(userData.id));

    return () => {
      dispatch(reviewListReset());
      dispatch(reviewSummaryReset());
    };
  }, [userData, reviewCreateSuccess]);

  useEffect(() => {
    if (isBackendConnected) return;
    dispatch(tempReviewListAction());
    dispatch(tempReviewSummaryAction());
  }, []);

  return (
    <Box mt="20px" display="flex" alignItems="start">
      <ParentCard title="Reviews" titleVariant="h3" parentBoxProps={{width: userType === UserType.CLIENT ? "70%" : "100%", height: "calc(100dvh - 240px)"}}>
        {reviews?.map((review) => (
          <ReviewCard review={review} />
        ))}
      </ParentCard>
      {userType === UserType.CLIENT && (
        <Box
          pl="40px"
          width="600px"
          display="flex"
          flexDirection="column"
          gap="40px"
          position="sticky"
          top="120px"
        >
          <ReviewSummaryPanel />
          <ReviewAdderPanel />
        </Box>
      )}
    </Box>
  );
};

const ReviewCard = ({ review }: { review: ReviewResponse }) => {
  const { client, date, rating, title, description } = review;

  const clientFullName = `${client.basicInfo.firstName} ${client.basicInfo.lastName}`;

  return (
    <Box display="flex" flexDirection="column" gap="10px" mt="30px">
      <Box display="flex" alignItems="start" gap="10px">
        <ImageCompo
          width="50px"
          height="50px"
          base64String={review.client.basicInfo.image}
        />
        <Box>
          <Typography variant="h4">{clientFullName}</Typography>
          <Typography variant="body2">{date}</Typography>
          <Box display="flex" alignItems="center" gap="10px">
            <Rating value={rating} readOnly size="small" />
            <Typography variant="body1" fontWeight={500}>
              {title}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="body2">{description}</Typography>
    </Box>
  );
};

const ReviewSummaryPanel = () => {
  const [reviewCount, setReviewCount] = useState(0);
  const [rating, setRating] = useState(0);

  const user = useAppSelector((state) => state.user.user.data);
  const reviewSummary = useAppSelector((state) => state.review.summary.data);

  useEffect(() => {
    if (!user) return;
    setReviewCount(user.reviewCount || 0);
    setRating(user.rating || 0);
  }, [user]);

  return (
    <Box>
      <Typography variant="h3">Summary</Typography>
      <RatingCard
        justifyContent="start"
        my="10px"
        fontSize="10px"
        rating={rating}
        reviewCount={reviewCount}
      />
      {reviewSummary &&
        Object.keys(reviewSummary)
          .sort((a, b) => Number(b) - Number(a))
          .map((key) => (
            <ReviewSummaryDetail
              rating={key}
              value={reviewSummary[key as "1" | "2" | "3" | "4" | "5"]}
            />
          ))}
    </Box>
  );
};

const ReviewSummaryDetail = ({
  rating,
  value,
}: {
  rating: string;
  value: number;
}) => (
  <Box color="#FC9835" display="flex" alignItems="center" gap="20px" mt="10px">
    <Box display="flex" gap="10px">
      <Typography variant="body1">{rating}</Typography>
      <Star fontSize="inherit" color="inherit" />
    </Box>
    <Grid xs>
      <LinearProgress variant="determinate" color="inherit" value={value} />
    </Grid>
    <Typography variant="body2" fontWeight={500}>
      {value.toFixed(0)}%
    </Typography>
  </Box>
);

const ReviewAdderPanel = () => {
  const initialState = {
    clientId: "",
    lawyerId: "",
    date: "",
    description: "",
    rating: 0,
    title: "",
  }
  const [reviewForm, setReviewForm] = useState<ReviewRequest>(initialState);

  const dispatch = useAppDispatch();

  const { data: userData } = useAppSelector((state) => state.user.user);
  const { loading, success } = useAppSelector(state => state.review.create);

  useEffect(() => {
    if (!userData) return;
    setReviewForm((prev) => ({ ...prev, lawyerId: userData.id }));
  }, [userData]);

  useEffect(() => {
    const clientId = new LocalStorageHandler().profileId;
    handleChange("clientId", clientId);
    handleChange("date", new Date().toISOString().substring(0,10))
  }, []);

  const handleChange = (name: string, value: string | null) => {
    setReviewForm((prev) => ({
      ...prev,
      [name]: value || "",
    }));
  };

  useEffect(() => {
    console.log("Review Form", reviewForm);
  },[reviewForm])

  useEffect(() => {
    if (success) {
      // if (userData) dispatch(reviewListAction(userData.id));
      dispatch(reviewListReset());
      setReviewForm(initialState);
      if (userData)  dispatch(getUserByProfileId(userData.id))
    }
  },[success])

  const submitReview = () => {
    if (isBackendConnected) dispatch(addReviewAction(reviewForm));
  };

  return (
    <Box display="flex" flexDirection="column" gap="15px">
      <Typography variant="h3">Add Review</Typography>
      <Box>
        <Typography variant="h4" mb="5px">
          Overall Review
        </Typography>
        <Rating
          value={reviewForm.rating}
          onChange={(_, value) =>
            setReviewForm({ ...reviewForm, rating: value || 0 })
          }
        />
      </Box>
      <Box>
        <FormField
          fullWidth
          label="Review Heading"
          name="title"
          value={reviewForm.title}
          handleChange={handleChange}
        />
        <FormField
          fullWidth
          label="Review"
          name="description"
          value={reviewForm.description}
          handleChange={handleChange}
          multiline
          rows={3}
        />
      </Box>
      <MUIButton size="small" color="secondary" onClick={submitReview} loading={loading}>
        Save
      </MUIButton>
    </Box>
  );
};

export default LawyerProfileReviews;
