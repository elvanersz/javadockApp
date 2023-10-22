package com.elvan.javadock.requests;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record PasswordResetRequest(
        @Size(min = 8, max = 20, message = "{javadock.constraints.password.size.message}")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$",
                message = "{javadock.constraints.password.pattern.message}")
        @Column(name = "password")
        String password
) {


}
