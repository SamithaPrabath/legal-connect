package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.dto.review.ReviewRequestDto;
import com.legalconnnect.server.dto.review.ReviewResponseDto;
import com.legalconnnect.server.dto.review.ReviewSummaryDto;
import com.legalconnnect.server.model.Review;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ReviewService extends MapperService<ReviewRequestDto, ReviewResponseDto, Review> {
    List<ReviewResponseDto> getReviewListByLawyer(Integer lawyerId) throws Exception;
    ReviewResponseDto createReview(ReviewRequestDto requestDto) throws Exception;
    ReviewSummaryDto getReviewSummaryByLawyer(Integer lawyerId) throws Exception;

}
