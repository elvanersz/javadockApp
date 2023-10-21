package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class PasswordNotificationException extends RuntimeException{

    public PasswordNotificationException(){
        super(Messages.getMessageForLocale("javadock.password.reset.email.failure", LocaleContextHolder.getLocale()));
    }
}