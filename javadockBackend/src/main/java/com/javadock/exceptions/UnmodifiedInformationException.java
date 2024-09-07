package com.javadock.exceptions;

import com.javadock.validation.Messages;
import org.springframework.context.i18n.LocaleContextHolder;

public class UnmodifiedInformationException extends RuntimeException{

    public UnmodifiedInformationException(){
        super(Messages.getMessageForLocale("javadock.unmodified.information", LocaleContextHolder.getLocale()));
    }
}
