package com.dev.mastercash.dto.goal;

import com.dev.mastercash.enums.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;

public class GoalDTO {

    private String id;
    private String idempotencyKey;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "TargetValue is required")
    @Positive(message = "TargetValue must be positive")
    private BigDecimal targetValue;

    @NotNull(message = "AmountSaved is required")
    @Positive(message = "AmountSaved must be positive")
    private BigDecimal amountSaved;

    @NotNull(message = "MonthlyContribution is required")
    @Positive(message = "MonthlyContribution must be positive")
    private BigDecimal monthlyContribution;

    @NotNull(message = "Category is required")
    private GoalCategory category;

    @NotNull(message = "DateFinal is required")
    private Instant dateFinal;

    public GoalDTO() {
    }

    public GoalDTO(String id, String idempotencyKey, String title,
                   BigDecimal targetValue, BigDecimal amountSaved,
                   BigDecimal monthlyContribution, GoalCategory category,
                   Instant dateFinal) {
        this.id = id;
        this.idempotencyKey = idempotencyKey;
        this.title = title;
        this.targetValue = targetValue;
        this.amountSaved = amountSaved;
        this.monthlyContribution = monthlyContribution;
        this.category = category;
        this.dateFinal = dateFinal;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Instant getDateFinal() {
        return dateFinal;
    }

    public void setDateFinal(Instant dateFinal) {
        this.dateFinal = dateFinal;
    }
}
