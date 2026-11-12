package com.dev.mastercash.exception;

import com.dev.mastercash.dto.ApiErrorDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
}