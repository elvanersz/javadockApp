package com.elvan.hoaxify.dto;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.validation.UniqueEmail;
import com.elvan.hoaxify.validation.UniqueUsername;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record CreateUserRequest(

        @UniqueUsername //custom annotation
        @NotBlank(message = "{hoaxify.constraints.username.NotBlank.message}")
        @Column(name = "username")
        String username,

        @Email(message = "{hoaxify.constraints.email.format.message}")
        @UniqueEmail //custom annotation
        @Size(min = 10, max = 255, message = "{hoaxify.constraints.email.format.message}")
        @Column(name = "email")
        String email,

        @Size(min = 8, max = 20, message = "{hoaxify.constraints.password.size.message}")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$",
                message = "{hoaxify.constraints.password.pattern.message}")
        @Column(name = "password")
        String password
)
{
    public User toUser(){
        User user = new User();

        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(password);

        return user;
    }
}