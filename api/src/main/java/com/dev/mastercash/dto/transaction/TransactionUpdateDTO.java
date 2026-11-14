package com.dev.mastercash.dto.transaction;

import com.dev.mastercash.entity.Transaction;
import com.dev.mastercash.enums.*;

import java.math.BigDecimal;
import java.time.Instant;

public class TransactionUpdateDTO {

    private String id;

    private String title;

    private BigDecimal amount;

    private TransactionCategory category;

    private TransactionType type;

    private PaymentMethod payment;

    private Instant date;

    public TransactionUpdateDTO() {
    }

    public TransactionUpdateDTO(String id, String title,
                                BigDecimal amount, TransactionCategory category,
                                TransactionType type, PaymentMethod payment,
                                Instant date) {
        this.id = id;
        this.title = title;
        this.amount = amount;
        this.category = category;
        this.type = type;
        this.payment = payment;
        this.date = date;
    }

    public TransactionUpdateDTO(Transaction entity) {
        this.id = entity.getId();
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
