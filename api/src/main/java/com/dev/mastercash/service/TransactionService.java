package com.dev.mastercash.service;

import com.dev.mastercash.dto.transaction.*;
import com.dev.mastercash.entity.*;
import com.dev.mastercash.exception.transaction.TransactionNotFoundException;
import com.dev.mastercash.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository repository;

    @Transactional(readOnly = true)
    public Page<TransactionResponseDTO> findAllPaged(String userId, Pageable pageable){
        return repository.findByUserId(userId, pageable)
                .map(TransactionResponseDTO::from);
    }

    @Transactional(readOnly = true)
    public TransactionResponseDTO findById(String id, User user){
        Transaction transaction = repository.findById(id)
                .orElseThrow(() -> new TransactionNotFoundException());

        if(!transaction.getUser().getId().equals(user.getId())){
            throw new TransactionNotFoundException();
        }

        return TransactionResponseDTO.from(transaction);
    }

    public TransactionResponseDTO create(TransactionDTO dto, User user, String idempotencyKey) {
        return repository.findByUserIdAndIdempotencyKey(user.getId(), idempotencyKey)
                .map(TransactionResponseDTO::from)
                .orElseGet(() -> insert(dto, user, idempotencyKey));
    }

    private TransactionResponseDTO insert(TransactionDTO dto, User user, String key) {
        try {
            Transaction entity = new Transaction();

            copyDtoToEntity(dto, entity);
            entity.setUser(user);
            entity.setIdempotencyKey(key);

            entity = repository.saveAndFlush(entity); // flush força a violação aqui

            return TransactionResponseDTO.from(entity);
        } catch (DataIntegrityViolationException e) {
            // Requisição concorrente com a mesma chave ganhou a corrida
            return repository.findByUserIdAndIdempotencyKey(user.getId(), key)
                    .map(TransactionResponseDTO::from)
                    .orElseThrow(() -> e);
        }
    }

    @Transactional
    public TransactionResponseDTO update(
            String id,
            TransactionUpdateDTO dto,
            User user
    ) {
        Transaction entity = repository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(TransactionNotFoundException::new);

        patchDtoToEntity(dto, entity);

        return TransactionResponseDTO.from(entity);
    }

    @Transactional
    public void delete(String id, User user) {
        Transaction transaction = repository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(TransactionNotFoundException::new);

        repository.delete(transaction);
    }

    private void copyDtoToEntity(TransactionDTO dto, Transaction entity) {
        entity.setTitle(dto.getTitle());
        entity.setAmount(dto.getAmount());
        entity.setCategory(dto.getCategory());
        entity.setType(dto.getType());
        entity.setPayment(dto.getPayment());
        entity.setDate(dto.getDate());
    }

    private void patchDtoToEntity(TransactionUpdateDTO dto, Transaction entity) {
        if (dto.getTitle() != null) {
            entity.setTitle(dto.getTitle());
        }

        if (dto.getAmount() != null) {
            entity.setAmount(dto.getAmount());
        }

        if (dto.getCategory() != null) {
            entity.setCategory(dto.getCategory());
        }

        if (dto.getType() != null) {
            entity.setType(dto.getType());
        }

        if (dto.getPayment() != null) {
            entity.setPayment(dto.getPayment());
        }

        if (dto.getDate() != null) {
            entity.setDate(dto.getDate());
        }
    }
}
