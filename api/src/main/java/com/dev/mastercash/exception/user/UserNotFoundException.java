package com.dev.mastercash.exception.user;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class UserNotFoundException extends BusinessException {

    public UserNotFoundException() {
        super("User not found!", HttpStatus.NOT_FOUND);
    }
}