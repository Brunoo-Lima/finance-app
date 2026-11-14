package com.dev.mastercash.exception;

import org.springframework.http.HttpStatus;

public class ForbiddenException extends BusinessException {
    public ForbiddenException() {
        super("Not permission!", HttpStatus.FORBIDDEN);
    }
}