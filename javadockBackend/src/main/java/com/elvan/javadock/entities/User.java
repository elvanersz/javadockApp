package com.elvan.javadock.entities;

import com.elvan.javadock.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstName")
    private String firstName;

    @Column(name = "lastName")
    private String lastName;

    @Column(name = "username")
    private String username;

    @Column(name = "birthDate")
    private Date birthDate;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private Role role = Role.GUEST;

    @Column(name = "createTime")
    private LocalDate createTime = LocalDate.now();

    @Column(name = "isActive")
    private boolean isActive = false;

    @Column(name = "activationToken")
    private String activationToken;
}