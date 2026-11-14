package com.dev.mastercash.controller;

import com.dev.mastercash.dto.goal.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.service.GoalService;
import com.dev.mastercash.utils.PageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/v1/goals")
public class GoalController {

    @Autowired
    private GoalService service;

    @GetMapping
    public ResponseEntity<PageResponse<GoalResponseDTO>> findAll(
            @AuthenticationPrincipal User user,
            Pageable pageable){
        Page<GoalResponseDTO> list = service.findAllPaged(user.getId(), pageable);

        return ResponseEntity.ok(new PageResponse<>(list));
    }

    @PostMapping
    public ResponseEntity<GoalResponseDTO> create(
            @Valid @RequestBody GoalDTO body,
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @AuthenticationPrincipal User user){
        GoalResponseDTO result = service.create(body, user, idempotencyKey);

        URI uri = URI.create("/goals/" + result.id());

        return ResponseEntity.created(uri).body(result);
    }

    @GetMapping("/{id}")
    public ResponseEntity<GoalResponseDTO> findById(@PathVariable String id,
                                                           @AuthenticationPrincipal User user){
        GoalResponseDTO goal = service.findById(id, user);
        return ResponseEntity.ok().body(goal);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<GoalResponseDTO> update(
            @PathVariable String id,
            @Valid @RequestBody GoalUpdateDTO dto,
            @AuthenticationPrincipal User user
    ) {
        GoalResponseDTO result = service.update(id, dto, user);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id,
                                       @AuthenticationPrincipal User user){
        service.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
