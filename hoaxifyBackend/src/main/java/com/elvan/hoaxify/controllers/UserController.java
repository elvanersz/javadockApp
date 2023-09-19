package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.errors.ErrorResponse;
import com.elvan.hoaxify.exceptions.NotUniqueEmailException;
import com.elvan.hoaxify.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;
    private MessageSource messageSource;

    @PostMapping("/api/v1/users")
    public User createUser(@Valid @RequestBody User newUser){
        return userService.createOneUser(newUser);
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        String errorMessage = messageSource
                .getMessage("hoaxify.error.validation", null, LocaleContextHolder.getLocale());

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(errorMessage);
        errorResponse.setStatusCode(400);

        var validationErrors = exception.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
        errorResponse.setValidationErrors(validationErrors);

        return errorResponse;
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleNotUniqueException(NotUniqueEmailException exception){
        String errorMessage = messageSource
                .getMessage("hoaxify.error.validation", null, LocaleContextHolder.getLocale());
        String emailErrorMessage = messageSource
                .getMessage("hoaxify.constraints.email.NotUnique.message", null, LocaleContextHolder.getLocale());

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(errorMessage);
        errorResponse.setStatusCode(400);

        Map<String, String> validationErrors = new HashMap<>();
        validationErrors.put("email", emailErrorMessage);
        errorResponse.setValidationErrors(validationErrors);

        return errorResponse;
    }
}