package com.legalconnnect.server.repository;

import com.legalconnnect.server.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query("SELECT p FROM Payment p WHERE p.lawyer.id = :userId OR p.client.id = :userId")
    List<Payment> getPaymentListByUser(Integer userId);
}
