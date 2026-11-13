package com.dev.mastercash.dto.transaction;

import com.dev.mastercash.entity.Transaction;
import com.dev.mastercash.enums.*;

import java.math.BigDecimal;
import java.time.Instant;

public record TransactionResponseDTO(String id, String title,
                                     BigDecimal amount, TransactionCategory category,
                                     TransactionType type, PaymentMethod payment,
                                     Instant date
) {
    public static TransactionResponseDTO from(Transaction transaction) {
        return new TransactionResponseDTO(
                transaction.getId(),
                transaction.getTitle(),
                transaction.getAmount(),
                transaction.getCategory(),
                transaction.getType(),
                transaction.getPayment(),
                transaction.getDate()
        );
    }
}
