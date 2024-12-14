package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class NotFoundException extends RuntimeException {

    public NotFoundException(Long id) {
        super(Messages.getMessageForLocale("javadock.user.not.found",
                LocaleContextHolder.getLocale(),
                id));
    }
}
