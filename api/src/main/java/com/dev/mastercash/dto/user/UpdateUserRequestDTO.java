package com.dev.mastercash.dto.user;

import jakarta.validation.constraints.*;

public record UpdateUserRequestDTO(
        @Size(min = 1) String name,
        @Email String email
) {}