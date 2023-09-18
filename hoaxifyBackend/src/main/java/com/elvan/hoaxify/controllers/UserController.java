package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.errors.ErrorResponse;
import com.elvan.hoaxify.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/api/v1/users")
    public User createUser(@Valid @RequestBody User newUser){
        return userService.createOneUser(newUser);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage("Validation error");
        errorResponse.setStatusCode(400);

        var validationErrors = exception.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
        errorResponse.setValidationErrors(validationErrors);

        return errorResponse;
    }
}