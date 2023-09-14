package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/api/v1/users")
    public User createUser(@RequestBody User newUser){
        return userService.createOneUser(newUser);
    }
}