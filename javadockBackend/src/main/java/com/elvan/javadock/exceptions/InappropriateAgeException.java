package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class InappropriateAgeException extends RuntimeException{

    public InappropriateAgeException() {
        super(Messages.getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections
                .singletonMap("birthDate", Messages.getMessageForLocale("javadock.constraints.inappropriate.age", LocaleContextHolder.getLocale()));
    }
}
