package com.dev.mastercash.dto.transaction;

import com.dev.mastercash.entity.Transaction;
import com.dev.mastercash.enums.*;
import jakarta.validation.constraints.*;

import java.math.BigDecimal;
import java.time.Instant;

public class TransactionDTO {

    private String id;
    private String idempotencyKey;

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private BigDecimal amount;

    @NotNull(message = "Category is required")
    private TransactionCategory category;

    @NotNull(message = "Type is required")
    private TransactionType type;

    @NotNull(message = "Payment is required")
    private PaymentMethod payment;

    @NotNull(message = "Date is required")
    private Instant date;

    public TransactionDTO() {
    }

    public TransactionDTO(String id, String idempotencyKey, String title,
                          BigDecimal amount, TransactionCategory category,
                          TransactionType type, PaymentMethod payment,
                          Instant date) {
        this.id = id;
        this.idempotencyKey = idempotencyKey;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.payment = payment;
        this.date = date;
    }

    public TransactionDTO(Transaction entity) {
        this.id = entity.getId();
        this.idempotencyKey = entity.getIdempotencyKey();
        this.title = entity.getTitle();
        this.amount = entity.getAmount();
        this.category = entity.getCategory();
        this.type = entity.getType();
        this.payment = entity.getPayment();
        this.date = entity.getDate();
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

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public TransactionCategory getCategory() {
        return category;
    }

    public void setCategory(TransactionCategory category) {
        this.category = category;
    }

    public TransactionType getType() {
        return type;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public PaymentMethod getPayment() {
        return payment;
    }

    public void setPayment(PaymentMethod payment) {
        this.payment = payment;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }
}
