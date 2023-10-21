package com.elvan.javadock.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record PasswordResetRequest(
        @Email(message = "{javadock.constraints.email.format.message}")
        @NotEmpty(message = "{javadock.constraints.email.format.message}")
        @Size(min = 10, max = 255, message = "{javadock.constraints.email.format.message}")
        @Column(name = "email")
        String email
) {


}
