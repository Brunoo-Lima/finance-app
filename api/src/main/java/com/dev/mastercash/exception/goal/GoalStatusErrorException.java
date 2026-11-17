package com.dev.mastercash.exception.goal;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class GoalStatusErrorException extends BusinessException {

    public GoalStatusErrorException(String message) {
        super(message, HttpStatus.CONFLICT);
    }
}