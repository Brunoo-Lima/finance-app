package com.dev.mastercash.exception;

import com.dev.mastercash.dto.ApiErrorDTO;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.*;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ApiErrorDTO> handleBusinessException(
            BusinessException exception) {

        ApiErrorDTO error = new ApiErrorDTO(
                exception.getStatus(),
                exception.getMessage()
        );

        return ResponseEntity
                .status(exception.getStatus())
                .body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorDTO> handleValidation(
            MethodArgumentNotValidException ex
    ) {
        Map<String, String> errors = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .collect(Collectors.toMap(
                        FieldError::getField,
                        fe -> fe.getDefaultMessage() != null
                                ? fe.getDefaultMessage()
                                : "Invalid field",
                        (a, b) -> a
                ));

        ApiErrorDTO error = new ApiErrorDTO(
                HttpStatus.BAD_REQUEST,
                "Validation error",
                errors
        );

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiErrorDTO> handleDataIntegrity(
            DataIntegrityViolationException ex) {

        ApiErrorDTO error = new ApiErrorDTO(
                HttpStatus.CONFLICT,
                "Data conflict");

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiErrorDTO> handleAccessDenied(
            AccessDeniedException ex) {

        ApiErrorDTO error = new ApiErrorDTO(
                HttpStatus.FORBIDDEN,
                "Access denied");

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(error);
    }

    // Fallback: qualquer coisa não tratada
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDTO> handleUnexpected(
            Exception ex) {
        ApiErrorDTO error = new ApiErrorDTO(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "Internal server error");
        return ResponseEntity
                .internalServerError()
                .body(error);
    }

}