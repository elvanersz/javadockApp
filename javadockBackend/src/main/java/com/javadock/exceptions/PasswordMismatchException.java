package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

import java.util.Collections;
import java.util.Map;

public class PasswordMismatchException extends RuntimeException{

    public PasswordMismatchException(){
        super(Messages.getMessageForLocale("javadock.error.validation", LocaleContextHolder.getLocale()));
    }

    public Map<String, String> getValidationErrors(){
        return Collections
                .singletonMap("password", Messages.getMessageForLocale("javadock.password.mismatch", LocaleContextHolder.getLocale()));
    }
}
