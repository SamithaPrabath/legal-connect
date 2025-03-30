package com.legalconnnect.server.dto.payment;

import com.legalconnnect.server.dto.user.UserResponseDto;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PaymentResponseDto {
    private Integer id;
    private String invoiceId;
    private String name;
    private String dueDate;
    private String status;
    private UserResponseDto lawyer;
    private Integer clientId;
    private Double amount;
}
