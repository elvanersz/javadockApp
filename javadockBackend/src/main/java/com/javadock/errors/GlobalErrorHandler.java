package com.javadock.errors;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalErrorHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(
            {DisabledException.class,
            AccessDeniedException.class})
    ResponseEntity<?> handleGlobalException(Exception exception, HttpServletRequest request) {
        ErrorResponse errorResponse = new ErrorResponse();

        errorResponse.setMessage(exception.getMessage());
        errorResponse.setPath(request.getRequestURI());

        if (exception instanceof DisabledException){
            errorResponse.setStatusCode(401);
        } else if (exception instanceof AccessDeniedException){
            errorResponse.setStatusCode(403);
        }

        return ResponseEntity.status(errorResponse.getStatusCode()).body(errorResponse);
    }
}
