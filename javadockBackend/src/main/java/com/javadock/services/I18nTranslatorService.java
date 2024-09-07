package com.javadock.services;

import com.javadock.repositories.I18nTranslatorRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class I18nTranslatorService {

    private static I18nTranslatorRepository i18nTranslatorRepository;

    @Autowired
    public void setI18nTranslatorRepository(I18nTranslatorRepository repository) {
        I18nTranslatorService.i18nTranslatorRepository = repository;
    }

    public static String translate(String textCode, String languageCode){
        return translate(textCode, languageCode, null);
    }

    public static String translate(String textCode, String languageCode, List arguments){
        String text = i18nTranslatorRepository.findByTextCodeAndLanguageCode(textCode, languageCode).getText();
        if (arguments != null){
            for (int i = 0; i < arguments.size(); i++){
                text = text.replace("{" + i + "}", String.valueOf(arguments.get(i)));
            }
        }
        return text;
    }
}
