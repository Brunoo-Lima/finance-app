package com.dev.mastercash.service;

import com.dev.mastercash.dto.transaction.BalanceDTO;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.enums.TransactionType;
import com.dev.mastercash.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
public class BalanceService {

    @Autowired
    private TransactionRepository repository;

    @Transactional(readOnly = true)
    public BalanceDTO getBalance(User user){

        BigDecimal income = repository.sumByUserIdAndType(
                user.getId(),
                TransactionType.DEPOSITO
        );

        BigDecimal expense = repository.sumByUserIdAndType(
                user.getId(),
                TransactionType.DESPESA
        );

        income = income != null ? income : BigDecimal.ZERO;
        expense = expense != null ? expense : BigDecimal.ZERO;

        BigDecimal balance = income.subtract(expense);

        return new BalanceDTO(income, expense, balance);
    }
}
