package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class NotUniqueUsernameException extends RuntimeException{

    public NotUniqueUsernameException() {
        super(Messages.getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections
                .singletonMap("username", Messages.getMessageForLocale("javadock.constraints.username.NotUnique.message", LocaleContextHolder.getLocale()));
    }
}