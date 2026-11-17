package com.dev.mastercash.dto.goal;

import com.dev.mastercash.enums.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;

public record GoalUpdateDTO(
        @Pattern(
                regexp = ".*\\S.*",
                message = "Title cannot be blank"
        )
        @Size(max = 100)
        String title,
        @Positive BigDecimal targetValue,
        @PositiveOrZero BigDecimal monthlyContribution,
        GoalCategory category,
        Instant dateFinal
) {}