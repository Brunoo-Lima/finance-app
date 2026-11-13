package com.dev.mastercash.controller;

import com.dev.mastercash.dto.auth.*;
import com.dev.mastercash.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO body) {
        return ResponseEntity.ok(authService.login(body));
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO > register(
            @Valid @RequestBody RegisterRequestDTO body
    ) {
        RegisterResponseDTO response =
                authService.register(body);

        URI uri =  ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/users/{id}").buildAndExpand(response.id()).toUri();

        return ResponseEntity
                .created(uri)
                .body(response);
    }
}