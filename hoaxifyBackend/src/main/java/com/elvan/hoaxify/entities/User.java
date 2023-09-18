package com.elvan.hoaxify.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Username can not be empty!")
    @Column(name = "username")
    private String username;

    @Email(message = "Not a properly formatted e-mail address!")
    @Size(min=10, max=255, message = "Not a properly formatted e-mail address!")
    @Column(name = "email")
    private String email;

    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#&()–[{}]:;',?/*~$^+=<>]).{8,20}$",
            message = "The password must contain at least one number, one lowercase letter, one uppercase letter and no special characters. " +
                    "Password must contain a length of at least 8 characters and a maximum of 20 characters.")
    @Column(name = "password")
    private String password;
}