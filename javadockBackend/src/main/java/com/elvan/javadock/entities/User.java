package com.elvan.javadock.entities;

import com.elvan.javadock.enums.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
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

    @ManyToOne
    @JoinColumn(name = "jobId")
    private Job job;

    @Column(name = "birthDate")
    private LocalDate birthDate;

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

    @Column(name = "image")
    private String image;
}