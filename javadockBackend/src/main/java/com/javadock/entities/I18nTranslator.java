package com.javadock.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "i18nTranslator")
public class I18nTranslator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "textCode")
    private String textCode;

    @Column(name = "languageCode")
    private String languageCode;

    @Column(name = "text")
    private String text;
}
