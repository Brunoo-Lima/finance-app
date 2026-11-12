package com.dev.mastercash.dto.auth;

import jakarta.validation.constraints.*;

public record RegisterRequestDTO(
        @NotBlank(message = "Name is required")
        String name,
        @NotBlank(message = "Email is required")
        @Email(message = "Email must be valid")
        String email,
        @NotBlank(message = "Password is required")
        @Size(min = 6, message = "Password must have at least 6 characters")
        String password) {

}