package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private MessageSource messageSource;

    @PostMapping("/api/v1/users")
    public User createUser(@Valid @RequestBody User newUser){
        return userService.createOneUser(newUser);
    }
}