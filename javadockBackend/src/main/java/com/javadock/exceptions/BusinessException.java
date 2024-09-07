package com.javadock.exceptions;

import org.springframework.context.i18n.LocaleContextHolder;

import java.util.List;

import static com.javadock.services.I18nTranslatorService.translate;

public class BusinessException extends RuntimeException {

    public BusinessException(String textCode) {
        super(translate(textCode, String.valueOf(LocaleContextHolder.getLocale())));
    }

    public BusinessException(String textCode, List arguments) {
        super(translate(textCode, String.valueOf(LocaleContextHolder.getLocale()), arguments));
    }
}
