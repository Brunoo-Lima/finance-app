package com.dev.mastercash.dto.goal;

import com.dev.mastercash.entity.Goal;
import com.dev.mastercash.enums.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;

public class GoalCreateDTO {

    private String idempotencyKey;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "TargetValue is required")
    @Positive(message = "TargetValue must be positive")
    private BigDecimal targetValue;

    @PositiveOrZero(message = "AmountSaved cannot be negative")
    private BigDecimal amountSaved;

    @NotNull(message = "MonthlyContribution is required")
    @Positive(message = "MonthlyContribution must be positive")
    private BigDecimal monthlyContribution;

    @NotNull(message = "Category is required")
    private GoalCategory category;

    private GoalStatus status;

    @NotNull(message = "DateFinal is required")
    private Instant dateFinal;

    public GoalCreateDTO() {
    }

    public GoalCreateDTO(String idempotencyKey, String title,
                         BigDecimal targetValue, BigDecimal amountSaved,
                         BigDecimal monthlyContribution, GoalCategory category, GoalStatus status,
                         Instant dateFinal) {
        this.idempotencyKey = idempotencyKey;
        this.title = title;
        this.targetValue = targetValue;
        this.amountSaved = amountSaved;
        this.monthlyContribution = monthlyContribution;
        this.category = category;
        this.status = status;
        this.dateFinal = dateFinal;
    }

    public GoalCreateDTO(Goal entity) {
        this.idempotencyKey = entity.getIdempotencyKey();
        this.title = entity.getTitle();
        this.targetValue = entity.getTargetValue();
        this.amountSaved = entity.getAmountSaved();
        this.monthlyContribution = entity.getMonthlyContribution();
        this.category = entity.getCategory();
        this.status = entity.getStatus();
        this.dateFinal = entity.getDateFinal();
    }

    public String getIdempotencyKey() {
        return idempotencyKey;
    }

    public void setIdempotencyKey(String idempotencyKey) {
        this.idempotencyKey = idempotencyKey;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getTargetValue() {
        return targetValue;
    }

    public void setTargetValue(BigDecimal targetValue) {
        this.targetValue = targetValue;
    }

    public BigDecimal getAmountSaved() {
        return amountSaved;
    }

    public void setAmountSaved(BigDecimal amountSaved) {
        this.amountSaved = amountSaved;
    }

    public BigDecimal getMonthlyContribution() {
        return monthlyContribution;
    }

    public void setMonthlyContribution(BigDecimal monthlyContribution) {
        this.monthlyContribution = monthlyContribution;
    }

    public GoalCategory getCategory() {
        return category;
    }

    public void setCategory(GoalCategory category) {
        this.category = category;
    }

    public GoalStatus getStatus() {
        return status;
    }

    public void setStatus(GoalStatus status) {
        this.status = status;
    }

    public Instant getDateFinal() {
        return dateFinal;
    }

    public void setDateFinal(Instant dateFinal) {
        this.dateFinal = dateFinal;
    }
}
