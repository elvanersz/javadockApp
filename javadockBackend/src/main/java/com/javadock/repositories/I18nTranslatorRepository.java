package com.javadock.repositories;

import com.javadock.entities.I18nTranslator;
import org.springframework.data.jpa.repository.JpaRepository;

public interface I18nTranslatorRepository extends JpaRepository<I18nTranslator, Long> {

    I18nTranslator findByTextCodeAndLanguageCode(String textCode, String languageCode);
}
