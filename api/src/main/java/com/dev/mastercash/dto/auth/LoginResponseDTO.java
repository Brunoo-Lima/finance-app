package com.dev.mastercash.dto.auth;

import com.dev.mastercash.dto.user.UserResponseDTO;

public record LoginResponseDTO(String id, String name,
                               String email
//                               List<String> roles
) {

    public static LoginResponseDTO from(UserResponseDTO user) {
        return new LoginResponseDTO(
                user.id(),
                user.name(),
                user.email()
//                user.getRoles().stream().map(Role::getName).toList()
        );
    }
}