package com.dev.mastercash.dto.user;

import com.dev.mastercash.entity.User;
import jakarta.validation.constraints.*;

public class UserCreateDTO {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Email is required")
    @Email()
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    public UserCreateDTO() {
    }

    public UserCreateDTO(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public UserCreateDTO(User entity) {
        this.name = entity.getName();
        this.email = entity.getEmail();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
