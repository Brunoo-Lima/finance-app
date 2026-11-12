package com.dev.mastercash.dto.user;

import com.dev.mastercash.entity.User;

public record UserResponseDTO(String id,
                              String name,
                              String email) {
    public static UserResponseDTO from(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail());
    }
}