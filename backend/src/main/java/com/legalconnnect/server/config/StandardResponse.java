package com.legalconnnect.server.config;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@Data
public class StandardResponse <T> {
    private Integer statusCode;
    private T data;
    private String message;
    private Date timestamp;

    public StandardResponse(int statusCode, T data, String message) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timestamp = new Date();
    }
}
