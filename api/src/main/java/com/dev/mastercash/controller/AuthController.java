package com.dev.mastercash.controller;

import com.dev.mastercash.dto.auth.*;
import com.dev.mastercash.dto.user.UserResponseDTO;
import com.dev.mastercash.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.Duration;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO body) {
        AuthResult result = authService.login(body);

        ResponseCookie cookie = ResponseCookie.from("access_token", result.token())
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(LoginResponseDTO.from(result.user()));
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO body
    ) {
        AuthResult result = authService.register(body);

        ResponseCookie cookie = ResponseCookie.from("access_token", result.token())
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(Duration.ofHours(1))
                .build();


        URI uri =  ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/users/{id}").buildAndExpand(result.user().id()).toUri();

        return ResponseEntity
                .created(uri)
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(result.user());
    }
}