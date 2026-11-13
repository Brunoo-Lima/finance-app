package com.dev.mastercash.controller;

import com.dev.mastercash.dto.transaction.BalanceDTO;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.service.BalanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/transactions/balance")
public class BalanceController {

    @Autowired
    private BalanceService service;

    @GetMapping
    public ResponseEntity<BalanceDTO> getBalance(
            @AuthenticationPrincipal User user){

        BalanceDTO balance = service.getBalance(user);
        return ResponseEntity.ok(balance);
    }

}

