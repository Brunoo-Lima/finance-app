package com.dev.mastercash.dto.goal;

import com.dev.mastercash.enums.GoalStatus;
import jakarta.validation.constraints.NotNull;

public record GoalStatusUpdateDTO(
        @NotNull GoalStatus status
) {}