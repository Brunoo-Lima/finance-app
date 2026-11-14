package com.dev.mastercash.dto.user;

public record ChangePasswordDTO(String currentPassword,
                                String newPassword) {}