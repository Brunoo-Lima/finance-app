package com.dev.mastercash.exception.auth;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class InvalidCredentialsException extends BusinessException {

    public InvalidCredentialsException() {
        super("Invalid credentials!", HttpStatus.UNAUTHORIZED);
    }
}