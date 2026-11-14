package com.dev.mastercash.controller;

import com.dev.mastercash.dto.user.*;
import com.dev.mastercash.entity.User;
import com.dev.mastercash.service.UserService;
import com.dev.mastercash.utils.PageResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public ResponseEntity<PageResponse<UserDTO>> findAll(Pageable pageable){
        Page<UserDTO> list = service.findAllPaged(pageable);
        return ResponseEntity.ok(new PageResponse<>(list));
    }

    @GetMapping("/me")
    public UserResponseDTO me(@AuthenticationPrincipal User user) {
        return UserResponseDTO.from(user);
    }

    @PatchMapping(value = "/{id}")
    public ResponseEntity<UserResponseDTO> update(@PathVariable String id,
                                                  @Valid @RequestBody UpdateUserRequestDTO body,
                                                  @AuthenticationPrincipal User user){
        UserResponseDTO response  = service.update(id, body, user);
        return ResponseEntity.ok(response);
    }


    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete (@PathVariable String id,
                                        @AuthenticationPrincipal User user){
        service.delete(id, user);
        return ResponseEntity.noContent().build();
    }
}
