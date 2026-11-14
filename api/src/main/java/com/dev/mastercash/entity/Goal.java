package com.dev.mastercash.entity;

import com.dev.mastercash.enums.GoalCategory;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(
        name = "goals",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_goal_user_idem_key",
                columnNames = {"user_id", "idempotency_key"}
        )
)
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "idempotency_key", nullable = false, updatable = false)
    private String idempotencyKey;

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalCategory category;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal targetValue;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amountSaved;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal monthlyContribution;
    private Instant dateFinal;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Goal() {
    }

    public Goal(String id, String idempotencyKey, String title,
                GoalCategory category, BigDecimal targetValue,
                BigDecimal amountSaved, BigDecimal monthlyContribution,
                Instant dateFinal, User user) {
        this.id = id;
        this.idempotencyKey = idempotencyKey;
        this.title = title;
        this.category = category;
        this.targetValue = targetValue;
        this.amountSaved = amountSaved;
        this.monthlyContribution = monthlyContribution;
        this.dateFinal = dateFinal;
        this.user = user;
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

    public GoalCategory getCategory() {
        return category;
    }

    public void setCategory(GoalCategory category) {
        this.category = category;
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

    public Instant getDateFinal() {
        return dateFinal;
    }

    public void setDateFinal(Instant dateFinal) {
        this.dateFinal = dateFinal;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        Goal goal = (Goal) o;
        return Objects.equals(id, goal.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
