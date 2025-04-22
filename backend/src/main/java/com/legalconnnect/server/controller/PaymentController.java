package com.legalconnnect.server.controller;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.dto.payment.PaymentRequestDto;
import com.legalconnnect.server.dto.payment.PaymentResponseDto;
import com.legalconnnect.server.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("${endpoints.payments}")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;

    @GetMapping("/{userId}")
    public ResponseEntity<StandardResponse<List<PaymentResponseDto>>> getPaymentsByUser(@PathVariable Integer userId) throws Exception {
        List<PaymentResponseDto> paymentsByUser = paymentService.getPaymentsByUser(userId);
        return ResponseEntityManager.ok(paymentsByUser);
    }

    @PostMapping
    public ResponseEntity<StandardResponse<PaymentResponseDto>> requestPayment(@RequestBody PaymentRequestDto requestDto) throws Exception {
        PaymentResponseDto responseDto = paymentService.paymentRequest(requestDto);
        return ResponseEntityManager.ok(responseDto);
    }

    @GetMapping("/download/{paymentId}")
    public byte[] downloadPayment(@PathVariable Integer paymentId) throws Exception {
        return paymentService.downloadPaymentInvoice(paymentId);
    }

    @PutMapping("/{paymentId}")
    public void  paymentCheckout(@PathVariable Integer paymentId) throws Exception {
        paymentService.paymentCheckout(paymentId);
    }

    @DeleteMapping("/{paymentId}")
    public void paymentDelete(@PathVariable Integer paymentId) throws Exception {
        paymentService.paymentDelete(paymentId);
    }

}
