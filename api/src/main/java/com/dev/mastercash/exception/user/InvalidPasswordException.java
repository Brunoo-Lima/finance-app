package com.dev.mastercash.exception.user;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class InvalidPasswordException extends BusinessException {

    public InvalidPasswordException() {
        super("Invalid password!", HttpStatus.BAD_REQUEST);
    }
}