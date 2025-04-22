package com.legalconnnect.server.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class ResponseEntityManager {
    public static <T> ResponseEntity<StandardResponse<T>> responseBuilder(HttpStatus status, T data, String message) {
        return ResponseEntity.status(status).body(new StandardResponse<>(status.value(),data, message));
    }

    public static  <T> ResponseEntity<StandardResponse<T>> ok(T data, String message) {
        return responseBuilder(HttpStatus.OK, data, message);
    }

    public static <T> ResponseEntity<StandardResponse<T>> ok(T data) {
        return ok(data, "");
    }

    public static <T> ResponseEntity<StandardResponse<T>> created(T data, String message) {
        return responseBuilder(HttpStatus.CREATED, data, message);
    }

    private static ResponseEntity<StandardResponse<Object>> error(HttpStatus status, String message) {
        return responseBuilder(status, null, message);
    }

    public static ResponseEntity<StandardResponse<Object>> notFound(String message) {
        return error(HttpStatus.NOT_FOUND, message);
    }

    public static ResponseEntity<StandardResponse<Object>> conflict(String message) {
        return error(HttpStatus.CONFLICT, message);
    }

    public static ResponseEntity<StandardResponse<Object>> badRequest(String message) {
        return error(HttpStatus.BAD_REQUEST, message);
    }

    public static ResponseEntity<StandardResponse<Object>> unprocessableEntity(String message) {
        return error(HttpStatus.UNPROCESSABLE_ENTITY, message);
    }

    public static ResponseEntity<StandardResponse<Object>> internalServerError(String message) {
        return error(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    public static ResponseEntity<StandardResponse<Object>> unauthorized(String message) {
        return error(HttpStatus.UNAUTHORIZED, message);
    }
}
