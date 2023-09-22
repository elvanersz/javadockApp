package com.elvan.hoaxify.controllers;

import com.elvan.hoaxify.errors.ErrorResponse;
import com.elvan.hoaxify.exceptions.ActivationNotificationException;
import com.elvan.hoaxify.exceptions.NotUniqueEmailException;
import com.elvan.hoaxify.exceptions.NotUniqueUsernameException;
import com.elvan.hoaxify.validation.Messages;
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
                .getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale());

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
}
