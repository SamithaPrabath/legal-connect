package com.legalconnnect.server.exception;

public class ValidationException extends RuntimeException{
    public ValidationException(String message, Throwable error) {
        super(message, error);
    }
}
