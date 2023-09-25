package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class InvalidTokenException extends RuntimeException{

    public InvalidTokenException(){
        super(Messages.getMessageForLocale("javadock.activate.user.invalid", LocaleContextHolder.getLocale()));
    }
}