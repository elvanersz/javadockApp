package com.javadock.validation;

import org.springframework.context.i18n.LocaleContextHolder;

import java.text.MessageFormat;
import java.util.Arrays;
import java.util.Locale;
import java.util.ResourceBundle;

import static com.javadock.services.I18nTranslatorService.translate;

public class Messages {

    /*public static String getMessageForLocale(String messageKey, Locale locale){
        return ResourceBundle
                .getBundle("messages", locale)
                .getString(messageKey);
    }

    public static String getMessageForLocale(String messageKey,
                                             Locale locale,
                                             Object... arguments){
        String message = getMessageForLocale(messageKey, locale);
        return MessageFormat.format(message, arguments);
    }*/

    public static String getMessageForLocale(String messageKey){
        return translate(messageKey, String.valueOf(LocaleContextHolder.getLocale()));
    }

    public static String getMessageForLocale(String messageKey, Object... arguments){
        return translate(messageKey, String.valueOf(LocaleContextHolder.getLocale()), Arrays.stream(arguments).toList());
    }
}