package com.dev.mastercash.repository;

import com.dev.mastercash.entity.Goal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GoalRepository extends JpaRepository<Goal, String> {
    Page<Goal> findByUserId(String userId, Pageable pageable);
    Optional<Goal> findByUserIdAndIdempotencyKey(String userId, String idempotencyKey);
    Optional<Goal> findByIdAndUserId(
            String id,
            String userId
    );
}
