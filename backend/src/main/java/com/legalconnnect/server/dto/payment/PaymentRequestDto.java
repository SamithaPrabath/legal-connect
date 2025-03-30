package com.legalconnnect.server.dto.payment;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentRequestDto {
    private String invoiceId;
    private String name;
    private String dueDate;
    private Integer clientId;
    private Integer lawyerId;
    private Double amount;
}
