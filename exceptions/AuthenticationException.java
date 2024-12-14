package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class AuthenticationException extends RuntimeException{

    public AuthenticationException(){
        super(Messages.getMessageForLocale("javadock.auth.invalid.credentials", LocaleContextHolder.getLocale()));
    }
}