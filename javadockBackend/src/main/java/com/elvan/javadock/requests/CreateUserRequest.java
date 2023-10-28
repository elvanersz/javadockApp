package com.elvan.javadock.requests;

import com.elvan.javadock.entities.Job;
import com.elvan.javadock.entities.University;
import com.elvan.javadock.entities.User;
import com.elvan.javadock.validation.UniqueEmail;
import com.elvan.javadock.validation.UniqueUsername;
import jakarta.persistence.Column;
import jakarta.validation.constraints.*;

public record CreateUserRequest(

        @NotBlank(message = "{javadock.constraints.firstName.NotBlank.message}")
        String firstName,

        @NotBlank(message = "{javadock.constraints.lastName.NotBlank.message}")
        String lastName,

        @UniqueUsername //custom annotation
        @NotBlank(message = "{javadock.constraints.username.NotBlank.message}")
        @Size(max = 20, message = "{javadock.constraints.username.max.size.message}")
        @Column(name = "username")
        String username,

        @Email(message = "{javadock.constraints.email.format.message}")
        @UniqueEmail //custom annotation
        @Size(min = 10, max = 255, message = "{javadock.constraints.email.format.message}")
        @Column(name = "email")
        String email,

        @Size(min = 8, max = 20, message = "{javadock.constraints.password.size.message}")
        @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$",
                message = "{javadock.constraints.password.pattern.message}")
        @Column(name = "password")
        String password
) {
    public User toUser() {
        User user = new User();
        Job job = new Job(0L);
        University university = new University(0L);

        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setJob(job);
        user.setUniversity(university);
        user.setEmail(email);
        user.setPassword(password);
        return user;

    }
}