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
        Goal goal = getGoalFounded(id, user);
        return GoalResponseDTO.from(goal);
    }

    // NÃO anotar com @Transactional: a violação de unicidade precisa
    // terminar a transação do saveAndFlush para o catch poder reconsultar.
    public GoalResponseDTO create(GoalCreateDTO dto, User user, String idempotencyKey) {
        return repository.findByUserIdAndEventKey(user.getId(), idempotencyKey)
                .map(GoalResponseDTO::from)
                .orElseGet(() -> insert(dto, user, idempotencyKey));
    }

    private GoalResponseDTO insert(GoalCreateDTO dto, User user, String key) {
        try {
            Goal entity = new Goal();

            copyDtoToEntity(dto, entity);
            entity.setUser(user);
            entity.setEventKey(key);

            entity = repository.saveAndFlush(entity); // flush força a violação aqui

            return GoalResponseDTO.from(entity);
        } catch (DataIntegrityViolationException e) {
            // Requisição concorrente com a mesma chave ganhou a corrida
            return repository.findByUserIdAndEventKey(user.getId(), key)
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
        Goal goal = getGoalFounded(id, user);

        patchDtoToEntity(dto, goal);

        return GoalResponseDTO.from(goal);
    }

    @Transactional
    public void delete(String id, User user) {
        Goal goal = getGoalFounded(id, user);

        repository.delete(goal);
    }

    @Transactional
    public GoalResponseDTO updateStatus(
            String id,
            GoalStatusUpdateDTO dto,
            User user
    ) {
        Goal goal = getGoalFounded(id, user);

        goal.changeStatus(dto.status());
        return GoalResponseDTO.from(goal);
    }

    @Transactional
    public GoalResponseDTO addContribution(
            String id,
            GoalAddContributionDTO dto,
            User user
    ) {
        Goal goal = getGoalFounded(id, user);
        goal.addContribution(dto.amount());
        return GoalResponseDTO.from(goal);
    }

    private Goal getGoalFounded(String id, User user) {
        return repository
                .findByIdAndUserId(id, user.getId())
                .orElseThrow(GoalNotFoundException::new);
    }

    private void copyDtoToEntity(GoalCreateDTO dto, Goal entity) {
        entity.setTitle(dto.getTitle());
        entity.setAmountSaved(dto.getAmountSaved());
        entity.setCategory(dto.getCategory());
        entity.setTargetValue(dto.getTargetValue());
        entity.setMonthlyContribution(dto.getMonthlyContribution());
        entity.setDateFinal(dto.getDateFinal());
    }

    private void patchDtoToEntity(GoalUpdateDTO dto, Goal entity) {
        if (dto.title() != null) {
            entity.setTitle(dto.title());
        }

        if (dto.category() != null) {
            entity.setCategory(dto.category());
        }

        if (dto.targetValue() != null) {
            entity.setTargetValue(dto.targetValue());
        }

        if (dto.monthlyContribution() != null) {
            entity.setMonthlyContribution(dto.monthlyContribution());
        }

        if (dto.dateFinal() != null) {
            entity.setDateFinal(dto.dateFinal());
        }
    }
}
