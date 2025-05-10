package com.legalconnnect.server.service;

import com.legalconnnect.server.common.service.MapperService;
import com.legalconnnect.server.dto.payment.PaymentRequestDto;
import com.legalconnnect.server.dto.payment.PaymentResponseDto;
import com.legalconnnect.server.model.Payment;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PaymentService extends MapperService<PaymentRequestDto, PaymentResponseDto, Payment> {
    List<PaymentResponseDto> getPaymentsByUser(Integer userId) throws Exception;
    PaymentResponseDto paymentRequest(PaymentRequestDto requestDto) throws Exception;
    byte[] downloadPaymentInvoice(Integer id) throws Exception;
    void paymentCheckout(Integer paymentId) throws Exception;
    void paymentDelete(Integer paymentId) throws Exception;
}
