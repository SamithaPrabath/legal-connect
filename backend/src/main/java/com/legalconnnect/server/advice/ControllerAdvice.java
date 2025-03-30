package com.legalconnnect.server.advice;

import com.legalconnnect.server.config.ResponseEntityManager;
import com.legalconnnect.server.config.StandardResponse;
import com.legalconnnect.server.exception.NotFoundException;
import com.legalconnnect.server.exception.ValidationException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class ControllerAdvice {
    private static final Logger log = LoggerFactory.getLogger(ControllerAdvice.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<StandardResponse<Object>> handleMethodArgumentNotValid(MethodArgumentNotValidException exception, WebRequest request) {
        logError(exception, request);
        return ResponseEntityManager.badRequest(exception.getFieldError() == null ? "Bad request" : exception.getFieldError().getDefaultMessage());
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<StandardResponse<Object>> handleNotFound(NotFoundException notFoundException, WebRequest webRequest) {
        log.error(notFoundException.getMessage(), notFoundException);
        logError(notFoundException, webRequest);
        return ResponseEntityManager.notFound(notFoundException.getMessage());
    }

//    @ExceptionHandler(DataConflictException.class)
//    public ResponseEntity<StandardResponse<Object>> handleConflict(DataConflictException dataConflictException, WebRequest webRequest) {
//        logError(dataConflictException, webRequest);
//        return ResponseEntityManager.conflict(dataConflictException.getMessage());
//    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<StandardResponse<Object>> handleValidationError(ValidationException validationException, WebRequest webRequest) {
        logError(validationException, webRequest);
        return ResponseEntityManager.unprocessableEntity(validationException.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<StandardResponse<Object>> handleInternalServerError(Exception exception, WebRequest webRequest) {
        logError(exception, webRequest);
        exception.printStackTrace();
        return ResponseEntityManager.internalServerError("Sorry! There must be an error in the server");
    }

    private void logError(Exception e, WebRequest request) {
        if (request instanceof ServletWebRequest) {
            String fullPath = ((ServletWebRequest) request).getRequest().getRequestURI();
            log.error("Error occurred at {}", fullPath);
        }
        log.error(e.getMessage());
    }
}
