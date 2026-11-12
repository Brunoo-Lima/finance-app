package com.dev.mastercash.dto;

import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.Map;

public record ApiErrorDTO(
        int status,
        String message,
        Map<String, String> errors,
        LocalDateTime timestamp
) {
    // Erros de negócio
    public ApiErrorDTO(HttpStatus status, String message) {
        this(status.value(), message, null, LocalDateTime.now());
    }

    // Erros de validação
    public ApiErrorDTO(
            HttpStatus status,
            String message,
            Map<String, String> errors
    ) {
        this(status.value(), message, errors, LocalDateTime.now());
    }
}