package com.elvan.javadock.controllers;

import com.elvan.javadock.errors.ErrorResponse;
import com.elvan.javadock.exceptions.ActivationNotificationException;
import com.elvan.javadock.exceptions.InvalidTokenException;
import com.elvan.javadock.exceptions.NotUniqueEmailException;
import com.elvan.javadock.exceptions.NotUniqueUsernameException;
import com.elvan.javadock.validation.Messages;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import java.util.stream.Collectors;

@AllArgsConstructor
@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception){
        String errorMessage = Messages
                .getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale());

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(errorMessage);
        errorResponse.setStatusCode(400);

        var validationErrors = exception.getBindingResult().getFieldErrors()
                .stream()
                .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
        errorResponse.setValidationErrors(validationErrors);

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(400));
    }

    @ExceptionHandler(NotUniqueEmailException.class)
    public ResponseEntity<Object> handleNotUniqueEmailException(NotUniqueEmailException exception){

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setStatusCode(400);
        errorResponse.setValidationErrors(exception.getValidationErrors());

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(400));
    }

    @ExceptionHandler(NotUniqueUsernameException.class)
    public ResponseEntity<Object> handleNotUniqueUsernameException(NotUniqueUsernameException exception){

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setStatusCode(400);
        errorResponse.setValidationErrors(exception.getValidationErrors());

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(400));
    }

    @ExceptionHandler(ActivationNotificationException.class)
    public ResponseEntity<Object> handleActivationNotificationException(ActivationNotificationException exception){

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users");
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setStatusCode(502);

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(502));
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<Object> handleInvalidTokenException(InvalidTokenException exception){

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath("/api/v1/users/activationToken/active");
        errorResponse.setMessage(exception.getMessage());
        errorResponse.setStatusCode(400);

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(400));
    }
}
