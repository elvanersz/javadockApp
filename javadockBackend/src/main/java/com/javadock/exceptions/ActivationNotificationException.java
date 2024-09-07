package com.javadock.exceptions;


import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ActivationNotificationException extends RuntimeException{

    public ActivationNotificationException(){
        super(Messages.getMessageForLocale("javadock.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}