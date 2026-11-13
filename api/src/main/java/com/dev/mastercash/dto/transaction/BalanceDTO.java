package com.dev.mastercash.dto.transaction;

import java.math.BigDecimal;

public record BalanceDTO(
        BigDecimal income,
        BigDecimal expense,
        BigDecimal balance
) {}