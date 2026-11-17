package com.dev.mastercash.dto.goal;

import jakarta.validation.constraints.*;

import java.math.BigDecimal;

public record GoalAddContributionDTO(
        @NotNull
        @Positive
        BigDecimal amount
) {}