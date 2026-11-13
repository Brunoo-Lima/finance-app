package com.dev.mastercash.controller;

import com.dev.mastercash.dto.transaction.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.service.TransactionService;
import com.dev.mastercash.utils.PageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/v1/transactions")
public class TransactionController {

    @Autowired
    private TransactionService service;

    @GetMapping
    public ResponseEntity<PageResponse<TransactionResponseDTO>> findAll(
            @AuthenticationPrincipal User user,
            Pageable pageable){
        Page<TransactionResponseDTO> list = service.findAllPaged(user.getId(), pageable);

        return ResponseEntity.ok(new PageResponse<>(list));
    }

    @PostMapping
    public ResponseEntity<TransactionResponseDTO> create(
            @Valid @RequestBody TransactionDTO body,
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @AuthenticationPrincipal User user){
        TransactionResponseDTO result = service.create(body, user, idempotencyKey);

        URI uri = URI.create("/transactions/" + result.id());

        return ResponseEntity.created(uri).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> findById(@PathVariable String id,
                                                           @AuthenticationPrincipal User user){
        TransactionResponseDTO transaction = service.findById(id, user);
        return ResponseEntity.ok().body(transaction);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<TransactionResponseDTO> update(
            @PathVariable String id,
            @Valid @RequestBody TransactionUpdateDTO dto,
            @AuthenticationPrincipal User user
    ) {
        TransactionResponseDTO result = service.update(id, dto, user);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id,
                                       @AuthenticationPrincipal User user){
        service.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
