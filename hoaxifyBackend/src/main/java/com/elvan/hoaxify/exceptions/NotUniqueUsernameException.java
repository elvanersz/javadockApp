package com.elvan.hoaxify.exceptions;

import com.elvan.hoaxify.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class NotUniqueUsernameException extends RuntimeException{

    public NotUniqueUsernameException() {
        super(Messages.getMessageForLocale("hoaxify.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections
                .singletonMap("username", Messages.getMessageForLocale("hoaxify.constraints.username.NotUnique.message", LocaleContextHolder.getLocale()));
    }
}