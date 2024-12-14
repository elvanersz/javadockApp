package com.javadock.exceptions;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ValidationConfig {

    @Bean
    public Validator validator() {
        ValidatorFactory factory = Validation.byDefaultProvider()
                .configure()
                .messageInterpolator(new CustomMessageInterpolator(
                        Validation.byDefaultProvider().configure().getDefaultMessageInterpolator()))
                .buildValidatorFactory();
        return factory.getValidator();
    }
}