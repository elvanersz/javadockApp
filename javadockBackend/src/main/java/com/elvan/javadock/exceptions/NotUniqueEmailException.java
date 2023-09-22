package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class NotUniqueEmailException extends RuntimeException{

    public NotUniqueEmailException() {
        super(Messages.getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections
                .singletonMap("email", Messages.getMessageForLocale("javadock.constraints.email.NotUnique.message", LocaleContextHolder.getLocale()));
    }
}
