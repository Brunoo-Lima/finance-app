package com.dev.mastercash.entity;

import com.dev.mastercash.enums.*;
import com.dev.mastercash.exception.goal.GoalStatusErrorException;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.Objects;

@Entity
@Table(
        name = "goals",
        uniqueConstraints = @UniqueConstraint(
                name = "uk_goal_user_evt_key",
                columnNames = {"user_id", "event_key"}
        )
)
public class Goal {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(name = "event_key", nullable = false, updatable = false)
    private String eventKey; //idempotencia

    private String title;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalCategory category;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal targetValue;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal amountSaved = BigDecimal.ZERO;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal monthlyContribution;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private GoalStatus status = GoalStatus.IN_PROGRESS;

    private Instant dateFinal;

    @Column(name = "completed_at")
    private Instant completedAt;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    public Goal() {
    }

    public Goal(String id, String eventKey, String title,
                GoalCategory category, BigDecimal targetValue,
                BigDecimal amountSaved, BigDecimal monthlyContribution,
                Instant dateFinal, User user) {
        this.id = id;
        this.eventKey = eventKey;
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

    public String getEventKey() {
        return eventKey;
    }

    public void setEventKey(String eventKey) {
        this.eventKey = eventKey;
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

    public Instant getCompletedAt() {
        return completedAt;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void addContribution(BigDecimal amount) {
        if (status != GoalStatus.IN_PROGRESS) {
            throw new GoalStatusErrorException("Meta is not accepting capital injections in its current state");
        }
        this.amountSaved = this.amountSaved.add(amount);

        if (this.amountSaved.compareTo(this.targetValue) >= 0) {
            this.complete();
        }
    }

    public GoalStatus getStatus() {
        return status;
    }

    public void changeStatus(GoalStatus newStatus) {
        if (this.status == newStatus) {
            return; // idempotente
        }

        switch (newStatus) {
            case COMPLETED -> {
                if (this.status != GoalStatus.IN_PROGRESS) {
                    throw new GoalStatusErrorException("You can only complete a goal that is in progress.");
                }
                complete();
            }
            case CANCELLED -> {
                if (this.status == GoalStatus.COMPLETED) {
                    throw new GoalStatusErrorException("A completed goal cannot be canceled");
                }
                cancel();
            }
            case IN_PROGRESS -> reopen();
            case PENDING -> {
                if (this.status == GoalStatus.COMPLETED) {
                    throw new GoalStatusErrorException("A completed goal cannot be set back to pending");
                }
                markPending();
            }
        }
    }

    private void complete() {
        this.status = GoalStatus.COMPLETED;
        this.completedAt = Instant.now();
    }

    private void reopen() {
        this.status = GoalStatus.IN_PROGRESS;
        this.completedAt = null;
    }

    private void cancel() {
        this.status = GoalStatus.CANCELLED;
        this.completedAt = null;
    }

    private void markPending() {
        this.status = GoalStatus.PENDING;
        this.completedAt = null;
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
