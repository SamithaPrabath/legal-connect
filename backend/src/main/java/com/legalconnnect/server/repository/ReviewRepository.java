package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Integer> {
    List<Review> findByLawyer_Id(Integer lawyerId);
}
