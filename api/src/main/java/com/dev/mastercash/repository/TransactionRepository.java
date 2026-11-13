package com.dev.mastercash.repository;

import com.dev.mastercash.entity.Transaction;
import com.dev.mastercash.enums.TransactionType;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, String> {
    Page<Transaction> findByUserId(String userId, Pageable pageable);
    Optional<Transaction> findByUserIdAndIdempotencyKey(String userId, String idempotencyKey);
    Optional<Transaction> findByIdAndUserId(
            String id,
            String userId
    );
    @Query("""
        SElECT SUM (t.amount)
        FROM Transaction t
        WHERE t.user.id = :userId
        AND t.type =:type
    """)
    BigDecimal sumByUserIdAndType(String userId, TransactionType type);
}
