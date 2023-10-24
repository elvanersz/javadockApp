package com.elvan.javadock.exceptions;

import com.elvan.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class UnmodifiedInformationException extends RuntimeException{

    public UnmodifiedInformationException(){
        super(Messages.getMessageForLocale("javadock.unmodified.information", LocaleContextHolder.getLocale()));
    }
}
