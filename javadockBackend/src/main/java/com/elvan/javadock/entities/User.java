package com.elvan.javadock.entities;

import com.elvan.javadock.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
    @JsonIgnore
    @JoinColumn(name = "jobId")
    private Job job;

    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "universityId")
    private University university;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "role")
    private Role role = Role.Guest;

    @Column(name = "createTime")
    private LocalDate createTime = LocalDate.now();

    @Column(name = "activationToken")
    private String activationToken;

    @Column(name = "image", columnDefinition = "longtext")
    private String image;

    @Column(name = "passwordResetToken")
    private String passwordResetToken;
}