package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class InvalidActivationTokenException extends RuntimeException{

    public InvalidActivationTokenException(){
        super(Messages.getMessageForLocale("javadock.activate.user.invalid", LocaleContextHolder.getLocale()));
    }
}