package com.elvan.hoaxify.entities;

import com.elvan.hoaxify.validation.UniqueEmail;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "users",
        uniqueConstraints = @UniqueConstraint(columnNames = {"username", "email"}))
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "{hoaxify.constraints.username.NotBlank.message}")
    @Column(name = "username")
    private String username;

    @Email(message = "{hoaxify.constraints.email.format.message}")
    @UniqueEmail //custom annotation
    @Size(min = 10, max = 255, message = "{hoaxify.constraints.email.format.message}")
    @Column(name = "email")
    private String email;

    @Size(min = 8, max = 20, message = "{hoaxify.constraints.password.size.message}")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$",
            message = "{hoaxify.constraints.password.pattern.message}")

    @Column(name = "password")
    private String password;
}