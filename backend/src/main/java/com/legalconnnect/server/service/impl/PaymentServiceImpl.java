package com.legalconnnect.server.service.impl;

import com.legalconnnect.server.dto.payment.PaymentRequestDto;
import com.legalconnnect.server.dto.payment.PaymentResponseDto;
import com.legalconnnect.server.enums.PaymentStatus;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.model.Payment;
import com.legalconnnect.server.model.UserInfo;
import com.legalconnnect.server.repository.PaymentRepository;
import com.legalconnnect.server.repository.UserRepository;
import com.legalconnnect.server.service.PaymentService;
import com.legalconnnect.server.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@RequiredArgsConstructor
@Service
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    @Override
    public List<PaymentResponseDto> getPaymentsByUser(Integer userId) throws Exception {
        List<Payment> paymentListByUser = paymentRepository.getPaymentListByUser(userId);
        return paymentListByUser.stream().map(this::toDto).toList();
    }

    @Override
    public PaymentResponseDto paymentRequest(PaymentRequestDto requestDto) throws Exception {
        Payment payment = toModel(requestDto);
        Payment savedPayment = paymentRepository.saveAndFlush(payment);
        return toDto(savedPayment);
    }

    @Override
    public byte[] downloadPaymentInvoice(Integer id) throws Exception {
        // TODO: update this method with jasper reports
        return new byte[0];
    }

    @Override
    public void paymentCheckout(Integer paymentId) throws Exception {
        Payment payment = paymentRepository.findById(paymentId).orElseThrow(() -> new NotFoundException("Payment Not Found"));
        payment.setStatus(PaymentStatus.PAID);
        paymentRepository.saveAndFlush(payment);
    }

    @Override
    public void paymentDelete(Integer paymentId) throws Exception {
        if (!paymentRepository.existsById(paymentId)) throw new NotFoundException("Payment not found!");
        paymentRepository.deleteById(paymentId);
    }

    @Override
    public PaymentResponseDto toDto(Payment payment) {
        PaymentResponseDto responseDto = new PaymentResponseDto();
        responseDto.setId(payment.getId());
        responseDto.setName(payment.getName());
        responseDto.setAmount(payment.getAmount());
        responseDto.setStatus(payment.getStatus().toString());
        responseDto.setDueDate(payment.getDueDate());
        responseDto.setClientId(payment.getClient().getId());
        responseDto.setInvoiceId(payment.getInvoiceId());
        responseDto.setLawyer(userService.toDto(payment.getLawyer()));

        return responseDto;
    }

    @Override
    public Payment toModel(PaymentRequestDto requestDto) {
        Payment payment = new Payment();

        UserInfo client = userRepository.findById(requestDto.getClientId()).orElseThrow(() -> new NotFoundException("Client not found!"));
        UserInfo lawyer = userRepository.findById(requestDto.getLawyerId()).orElseThrow(() -> new NotFoundException("Lawyer not found!"));

        payment.setClient(client);
        payment.setLawyer(lawyer);
        payment.setName(requestDto.getName());
        payment.setAmount(requestDto.getAmount());
        payment.setDueDate(requestDto.getDueDate());
        payment.setInvoiceId(requestDto.getInvoiceId());
        payment.setStatus(PaymentStatus.UNPAID);

        return payment;
    }
}
