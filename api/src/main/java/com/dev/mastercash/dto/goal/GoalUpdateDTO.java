package com.dev.mastercash.dto.goal;

import com.dev.mastercash.enums.GoalCategory;

import java.math.BigDecimal;
import java.time.Instant;

public class GoalUpdateDTO {

    private String id;
    private String title;
    private BigDecimal targetValue;
    private BigDecimal amountSaved;
    private BigDecimal monthlyContribution;
    private GoalCategory category;
    private Instant dateFinal;

    public GoalUpdateDTO() {
    }

    public GoalUpdateDTO(String id, String title,
                         BigDecimal targetValue, BigDecimal amountSaved,
                         BigDecimal monthlyContribution, GoalCategory category,
                         Instant dateFinal) {
        this.id = id;
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
