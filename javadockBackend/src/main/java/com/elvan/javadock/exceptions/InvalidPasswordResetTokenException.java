package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class InvalidPasswordResetTokenException extends RuntimeException{

    public InvalidPasswordResetTokenException() {
        super(Messages.getMessageForLocale("javadock.password.reset.invalid", LocaleContextHolder.getLocale()));

    }
}
