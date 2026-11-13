package com.dev.mastercash.dto.auth;

import com.dev.mastercash.dto.user.UserResponseDTO;

public record AuthResult(String token, UserResponseDTO user) {}