package com.elvan.javadock.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UniqueUsernameValidator.class)
@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueUsername {

    String message() default "{javadock.constraints.username.NotUnique.message}";
    Class<?>[] groups() default { };
    Class<? extends Payload>[] payload() default { };
}
