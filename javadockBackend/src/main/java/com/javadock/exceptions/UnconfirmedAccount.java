package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class UnconfirmedAccount extends RuntimeException{

    public UnconfirmedAccount(){
        super(Messages.getMessageForLocale("javadock.unconfirmed.account", LocaleContextHolder.getLocale()));
    }
}
