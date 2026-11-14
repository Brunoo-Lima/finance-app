package com.dev.mastercash.service;

import com.dev.mastercash.dto.auth.RegisterRequestDTO;
import com.dev.mastercash.dto.user.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.exception.DatabaseException;
import com.dev.mastercash.exception.ForbiddenException;
import com.dev.mastercash.exception.user.UserNotFoundException;
import com.dev.mastercash.repository.UserRepository;
import com.dev.mastercash.exception.user.EmailAlreadyExistsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllPaged(Pageable pageable){

        Page<User> list = repository.findAll(pageable);

        return list.map(user -> new UserDTO(user));
    }

//    @Transactional(readOnly = true)
//    public UserResponseDTO findById(String id, User user){
//       User userFounded = repository.findById(id)
//               .orElseThrow(() -> new UserNotFoundException());
//
//       if(!userFounded.getId().equals(user.getId())){
//           throw new UserNotFoundException();
//       }
//
//        return UserResponseDTO.from(userFounded);
//    }

    @Transactional
    public User create(RegisterRequestDTO dto) {

        if (repository.existsByEmail(dto.email())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();

        copyDtoToEntity(dto, user);

        return repository.save(user);
    }

    @Transactional
    public UserResponseDTO update(String id, UpdateUserRequestDTO dto, User user){
        if (user == null || !user.getId().equals(id)) {
            throw new ForbiddenException();
        }

        User entity = repository.findById(id)
                .orElseThrow(UserNotFoundException::new);

        if (dto.name() != null) {
            entity.setName(dto.name());
        }

        if (dto.email() != null && !dto.email().equalsIgnoreCase(entity.getEmail())) {
            if (repository.existsByEmail(dto.email())) {
                throw new EmailAlreadyExistsException();
            }
            entity.setEmail(dto.email());
        }

        return UserResponseDTO.from(entity);
    }

    @Transactional
    public void delete(String id, User user){

        if (!user.getId().equals(id)) {
            throw new ForbiddenException();
        }

        if (!repository.existsById(id)) {
            throw new UserNotFoundException();
        }

        try {
            repository.deleteById(id);
            repository.flush();
        }catch (DataIntegrityViolationException exception){
            throw new DatabaseException("Integrity violation");
        }
    }

    private void copyDtoToEntity(RegisterRequestDTO dto, User entity){
        entity.setName(dto.name());
        entity.setEmail(dto.email());
        entity.setPassword(
                passwordEncoder.encode(dto.password())
        );
    }
}
