package com.elvan.hoaxify.exceptions;


import com.elvan.hoaxify.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class ActivationNotificationException extends RuntimeException{

    public ActivationNotificationException(){
        super(Messages.getMessageForLocale("hoaxify.create.user.email.failure", LocaleContextHolder.getLocale()));
    }
}