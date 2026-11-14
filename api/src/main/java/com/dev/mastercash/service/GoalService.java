package com.dev.mastercash.service;

import com.dev.mastercash.dto.goal.*;
import com.dev.mastercash.entity.*;
import com.dev.mastercash.exception.goal.GoalNotFoundException;
import com.dev.mastercash.repository.GoalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class GoalService {

    @Autowired
    private GoalRepository repository;

    @Transactional(readOnly = true)
    public Page<GoalResponseDTO> findAllPaged(String userId, Pageable pageable){
        return repository.findByUserId(userId, pageable)
                .map(GoalResponseDTO::from);
    }

    @Transactional(readOnly = true)
    public GoalResponseDTO findById(String id, User user){
        Goal goal = repository.findById(id)
                .orElseThrow(() -> new GoalNotFoundException());

        if(!goal.getUser().getId().equals(user.getId())){
            throw new GoalNotFoundException();
        }

        return GoalResponseDTO.from(goal);
    }

    public GoalResponseDTO create(GoalDTO dto, User user, String idempotencyKey) {
        return repository.findByUserIdAndIdempotencyKey(user.getId(), idempotencyKey)
                .map(GoalResponseDTO::from)
                .orElseGet(() -> insert(dto, user, idempotencyKey));
    }

    private GoalResponseDTO insert(GoalDTO dto, User user, String key) {
        try {
            Goal entity = new Goal();

            copyDtoToEntity(dto, entity);
            entity.setUser(user);
            entity.setIdempotencyKey(key);

            entity = repository.saveAndFlush(entity); // flush força a violação aqui

            return GoalResponseDTO.from(entity);
        } catch (DataIntegrityViolationException e) {
            // Requisição concorrente com a mesma chave ganhou a corrida
            return repository.findByUserIdAndIdempotencyKey(user.getId(), key)
                    .map(GoalResponseDTO::from)
                    .orElseThrow(() -> e);
        }
    }

    @Transactional
    public GoalResponseDTO update(
            String id,
            GoalUpdateDTO dto,
            User user
    ) {
        Goal entity = repository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(GoalNotFoundException::new);

        patchDtoToEntity(dto, entity);

        return GoalResponseDTO.from(entity);
    }

    @Transactional
    public void delete(String id, User user) {
        Goal goal = repository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(GoalNotFoundException::new);

        repository.delete(goal);
    }

    private void copyDtoToEntity(GoalDTO dto, Goal entity) {
        entity.setTitle(dto.getTitle());
        entity.setAmountSaved(dto.getAmountSaved());
        entity.setCategory(dto.getCategory());
        entity.setTargetValue(dto.getTargetValue());
        entity.setMonthlyContribution(dto.getMonthlyContribution());
        entity.setDateFinal(dto.getDateFinal());
    }

    private void patchDtoToEntity(GoalUpdateDTO dto, Goal entity) {
        if (dto.getTitle() != null) {
            entity.setTitle(dto.getTitle());
        }

        if (dto.getAmountSaved() != null) {
            entity.setAmountSaved(dto.getAmountSaved());
        }

        if (dto.getCategory() != null) {
            entity.setCategory(dto.getCategory());
        }

        if (dto.getTargetValue() != null) {
            entity.setTargetValue(dto.getTargetValue());
        }

        if (dto.getMonthlyContribution() != null) {
            entity.setMonthlyContribution(dto.getMonthlyContribution());
        }

        if (dto.getDateFinal() != null) {
            entity.setDateFinal(dto.getDateFinal());
        }
    }
}
