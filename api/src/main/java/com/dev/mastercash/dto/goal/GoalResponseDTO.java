package com.dev.mastercash.dto.goal;

import com.dev.mastercash.entity.Goal;
import com.dev.mastercash.enums.GoalCategory;

import java.math.BigDecimal;
import java.time.Instant;

public record GoalResponseDTO(String id, String title, GoalCategory category,
                              BigDecimal targetValue, BigDecimal amountSaved,
                              BigDecimal monthlyContribution, Instant dateFinal
) {
    public static GoalResponseDTO from(Goal goal) {
        return new GoalResponseDTO(
                goal.getId(),
                goal.getTitle(),
                goal.getCategory(),
                goal.getTargetValue(),
                goal.getAmountSaved(),
                goal.getMonthlyContribution(),
                goal.getDateFinal()
        );
    }
}
