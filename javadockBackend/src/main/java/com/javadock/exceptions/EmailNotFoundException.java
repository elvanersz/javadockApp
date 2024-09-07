package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class EmailNotFoundException extends RuntimeException {

    public EmailNotFoundException() {
        super(Messages.getMessageForLocale("javadock.email.not.found",
                LocaleContextHolder.getLocale()));
    }
}
