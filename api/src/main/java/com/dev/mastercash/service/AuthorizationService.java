package com.dev.mastercash.service;

import com.dev.mastercash.dto.auth.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.exception.auth.InvalidCredentialsException;
import com.dev.mastercash.infra.security.CustomUserDetailsService;
import com.dev.mastercash.infra.security.TokenService;
import com.dev.mastercash.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthorizationService extends CustomUserDetailsService {

    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Autowired
    private UserRepository repository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponseDTO login(LoginRequestDTO body){
        User user = repository.findByEmail(body.email()).orElseThrow(InvalidCredentialsException::new);

        if(!passwordEncoder.matches(body.password(), user.getPassword())){
            throw new InvalidCredentialsException();
        }

        String token = tokenService.generateToken(user);
        return new LoginResponseDTO(user.getName(), user.getEmail(), token);
    }

    public RegisterResponseDTO register(RegisterRequestDTO dto) {
        User user = userService.create(dto);

        String token = tokenService.generateToken(user);

        return new RegisterResponseDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                token
        );
    }

}
