package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.requests.CreateUserRequest;
import com.elvan.hoaxify.services.UserService;
import com.elvan.hoaxify.validation.GenericMessage;
import com.elvan.hoaxify.validation.Messages;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private MessageSource messageSource;

    @PostMapping("/api/v1/users")
    public GenericMessage createUser(@Valid @RequestBody CreateUserRequest newUser){
        userService.createOneUser(newUser.toUser());
        String message = Messages.getMessageForLocale("hoaxify.create.user.success.message", LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }
}