package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.review.ReviewRequestDto;
import com.legalconnnect.server.dto.review.ReviewResponseDto;
import com.legalconnnect.server.dto.review.ReviewSummaryDto;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Review;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.ReviewRepository;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.ReviewService;
import com.legalconnnect.server.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Transactional
@RequiredArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {
    private static final Logger log = LoggerFactory.getLogger(ReviewServiceImpl.class);
    private final ReviewRepository reviewRepository;
    private final UserService userService;
    private final UserRepository userRepository;

    @Override
    public List<ReviewResponseDto> getReviewListByLawyer(Integer lawyerId) throws Exception {
        List<Review> reviewsForLawyer = reviewRepository.findByLawyer_Id(lawyerId);
        return reviewsForLawyer.stream().map(this::toDto).toList();
    }

    @Override
    public ReviewResponseDto createReview(ReviewRequestDto requestDto) throws Exception {
        Review review = toModel(requestDto);
        Review savedReview = reviewRepository.save(review);

        // updating review count
        userService.updateLawyerReviews(savedReview);

        return toDto(savedReview);
    }

    @Override
    public ReviewSummaryDto getReviewSummaryByLawyer(Integer lawyerId) throws Exception {
        ReviewSummaryDto reviewSummaryDto = new ReviewSummaryDto();
        Map<Integer, Integer> reviewCounts = new HashMap<>();

        List<Review> reviewsForLawyer = reviewRepository.findByLawyer_Id(lawyerId);
        reviewsForLawyer.forEach(review -> {
            reviewCounts.compute(review.getRating(), (k, previousRating) -> previousRating == null ? 1 : previousRating + 1);
        });

        int totalReviewCount = reviewsForLawyer.size();

        reviewSummaryDto.setFive(reviewPercentage(reviewCounts.get(5), totalReviewCount));
        reviewSummaryDto.setFour(reviewPercentage(reviewCounts.get(4), totalReviewCount));
        reviewSummaryDto.setThree(reviewPercentage(reviewCounts.get(3), totalReviewCount));
        reviewSummaryDto.setTwo(reviewPercentage(reviewCounts.get(2), totalReviewCount));
        reviewSummaryDto.setOne(reviewPercentage(reviewCounts.get(1), totalReviewCount));

        return reviewSummaryDto;
    }

    private double reviewPercentage(Integer reviewCount, double total) {
        return reviewCount == null ? 0 : reviewCount * 100/ total;
    }

    @Override
    public ReviewResponseDto toDto(Review review) {
        ReviewResponseDto responseDto = new ReviewResponseDto();
        responseDto.setDescription(review.getDescription());
        responseDto.setDate(review.getDate());
        responseDto.setTitle(review.getTitle());
        responseDto.setRating(review.getRating());
        responseDto.setClient(userService.toDto(review.getClient()));
        return responseDto;
    }

    @Override
    public Review toModel(ReviewRequestDto requestDto) {
        Review review = new Review();

        UserInfo client = userRepository.findById(requestDto.getClientId()).orElseThrow(() -> new NotFoundException("Client Not Found!"));
        UserInfo lawyer = userRepository.findById(requestDto.getLawyerId()).orElseThrow(() -> new NotFoundException("Lawyer Not Found!"));

        review.setClient(client);
        review.setLawyer(lawyer);
        review.setDate(requestDto.getDate());
        review.setTitle(requestDto.getTitle());
        review.setDescription(requestDto.getDescription());
        review.setRating(requestDto.getRating());
        review.setDate(requestDto.getDate());

        return review;
    }
}
