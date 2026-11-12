package com.dev.mastercash.exception.user;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class EmailAlreadyExistsException extends BusinessException {

    public EmailAlreadyExistsException() {
        super("E-mail already exists!", HttpStatus.CONFLICT);
    }
}