package com.dev.mastercash.exception.goal;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class GoalNotFoundException extends BusinessException {

    public GoalNotFoundException() {
        super("Goal not found!", HttpStatus.NOT_FOUND);
    }
}