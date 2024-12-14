package com.javadock.exceptions;

import jakarta.validation.MessageInterpolator;
import org.springframework.context.i18n.LocaleContextHolder;
import java.util.Locale;

import static com.javadock.services.I18nTranslatorService.translate;

public class CustomMessageInterpolator implements MessageInterpolator {

    private final MessageInterpolator defaultInterpolator;

    public CustomMessageInterpolator(MessageInterpolator defaultInterpolator) {
        this.defaultInterpolator = defaultInterpolator;
    }

    @Override
    public String interpolate(String messageTemplate, Context context) {
        return translate(messageTemplate, String.valueOf(LocaleContextHolder.getLocale()));
    }

    @Override
    public String interpolate(String messageTemplate, Context context, Locale locale) {
        return translate(messageTemplate, String.valueOf(LocaleContextHolder.getLocale()));
    }
}
