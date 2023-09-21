package com.elvan.hoaxify.entities;

import com.elvan.hoaxify.validation.UniqueEmail;
import com.elvan.hoaxify.validation.UniqueUsername;
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

    @Column(name = "username")
    private String username;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "isActive")
    private boolean isActive= false;

    @Column(name = "activationToken")
    private String activationToken;
}