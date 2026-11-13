package com.dev.mastercash.exception.transaction;

import com.dev.mastercash.exception.BusinessException;
import org.springframework.http.HttpStatus;

public class TransactionNotFoundException extends BusinessException {

    public TransactionNotFoundException() {
        super("Transaction not found!", HttpStatus.NOT_FOUND);
    }
}