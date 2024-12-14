package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class PasswordNotificationException extends RuntimeException{

    public PasswordNotificationException(){
        super(Messages.getMessageForLocale("javadock.password.reset.email.failure", LocaleContextHolder.getLocale()));
    }
}