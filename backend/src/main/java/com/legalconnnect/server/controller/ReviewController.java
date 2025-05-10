package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.review.ReviewRequestDto;
import com.legalconnnect.server.dto.review.ReviewResponseDto;
import com.legalconnnect.server.dto.review.ReviewSummaryDto;
import com.legalconnnect.server.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.review}")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{profileId}")
    public ResponseEntity<StandardResponse<List<ReviewResponseDto>>> getEventsByUser(@PathVariable Integer profileId) throws Exception {
        List<ReviewResponseDto> reviewListByLawyer = reviewService.getReviewListByLawyer(profileId);
        return ResponseEntityManager.ok(reviewListByLawyer);
    }

    @GetMapping("/summary/{profileId}")
    public ResponseEntity<StandardResponse<ReviewSummaryDto>> getReviewSummary(@PathVariable Integer profileId) throws Exception {
        ReviewSummaryDto reviewSummaryByLawyer = reviewService.getReviewSummaryByLawyer(profileId);
        return ResponseEntityManager.ok(reviewSummaryByLawyer);
    }

    @PostMapping
    private ResponseEntity<StandardResponse<ReviewResponseDto>> addReview(@RequestBody ReviewRequestDto requestDto) throws Exception {
        ReviewResponseDto createdReview = reviewService.createReview(requestDto);
        return ResponseEntityManager.created(createdReview, "Review added successfully!");
    }
}
