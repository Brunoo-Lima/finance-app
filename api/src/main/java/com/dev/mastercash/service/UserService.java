package com.dev.mastercash.service;

import com.dev.mastercash.dto.user.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.exception.DatabaseException;
import com.dev.mastercash.exception.user.UserNotFoundException;
import com.dev.mastercash.repository.UserRepository;
import com.dev.mastercash.exception.user.EmailAlreadyExistsException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(readOnly = true)
    public Page<UserDTO> findAllPaged(Pageable pageable){

        Page<User> list = userRepository.findAll(pageable);

        return list.map(user -> new UserDTO(user));
    }

    @Transactional(readOnly = true)
    public UserDTO findById(String id){
       Optional<User> obj = userRepository.findById(id);
       User entity = obj.orElseThrow(() -> new UserNotFoundException());

        return new UserDTO(entity);
    }

    @Transactional
    public User create(UserDTO dto) {

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new EmailAlreadyExistsException();
        }

        User user = new User();

        copyDtoToEntity(dto, user);

        return userRepository.save(user);
    }

    @Transactional
    public UserResponseDTO update(String id, UpdateUserRequestDTO dto){
        try {
            User entity = userRepository.getReferenceById(id);

            if (dto.name() != null) {
                entity.setName(dto.name());
            }

            if (dto.email() != null && !dto.email().equalsIgnoreCase(entity.getEmail())) {
                if (userRepository.existsByEmail(dto.email())) {
                    throw new EmailAlreadyExistsException();
                }
                entity.setEmail(dto.email());
            }

            entity = userRepository.save(entity);

            return UserResponseDTO.from(entity);

        }catch (EntityNotFoundException e){
            throw new UserNotFoundException();
        }

    }

    @Transactional
    public void delete(String id){
        try {

            if(!userRepository.existsById(id)){
                throw new UserNotFoundException();
            }

            userRepository.deleteById(id);
        }catch (DataIntegrityViolationException exception){
            throw new DatabaseException("Integrity violation");
        }
    }


    private void copyDtoToEntity(UserDTO dto, User entity){
        entity.setName(dto.getName());
        entity.setEmail(dto.getEmail());
        entity.setPassword(
                passwordEncoder.encode(dto.getPassword())
        );
    }
}
