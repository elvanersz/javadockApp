package com.elvan.javadock.controllers;

import com.elvan.javadock.errors.ErrorResponse;
import com.elvan.javadock.exceptions.*;
import com.elvan.javadock.validation.Messages;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@AllArgsConstructor
@RestControllerAdvice
public class ExceptionControllerAdvice {

    @ExceptionHandler({
            MethodArgumentNotValidException.class,
            NotUniqueEmailException.class,
            NotUniqueUsernameException.class,
            ActivationNotificationException.class,
            InvalidTokenException.class,
            NotFoundException.class,
            AuthenticationException.class})
    public ResponseEntity<Object> handleException(Exception exception,
                                                  HttpServletRequest request) {

        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setPath(request.getRequestURI());
        errorResponse.setMessage(exception.getMessage());

        if(exception instanceof MethodArgumentNotValidException){
            String errorMessage = Messages
                    .getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale());

            errorResponse.setMessage(errorMessage);
            errorResponse.setStatusCode(400);
            var validationErrors = ((MethodArgumentNotValidException)exception).getBindingResult().getFieldErrors()
                    .stream()
                    .collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage, (existing, replacing) -> existing));
            errorResponse.setValidationErrors(validationErrors);
        } else if (exception instanceof NotUniqueEmailException) {
            errorResponse.setStatusCode(400);
            errorResponse.setValidationErrors(((NotUniqueEmailException)exception).getValidationErrors());
        } else if (exception instanceof NotUniqueUsernameException){
            errorResponse.setStatusCode(400);
            errorResponse.setValidationErrors(((NotUniqueUsernameException)exception).getValidationErrors());
        } else if (exception instanceof ActivationNotificationException){
            errorResponse.setStatusCode(502);
        } else if (exception instanceof InvalidTokenException){
            errorResponse.setStatusCode(400);
        } else if (exception instanceof NotFoundException){
            errorResponse.setStatusCode(404);
        } else if (exception instanceof AuthenticationException){
            errorResponse.setStatusCode(401);
        }

        return new ResponseEntity<>(errorResponse, HttpStatusCode.valueOf(errorResponse.getStatusCode()));
    }
}