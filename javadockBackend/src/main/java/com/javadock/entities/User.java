package com.javadock.entities;

import com.javadock.enums.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User extends BaseEntity{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;

    private String lastName;

    private String username;

    private String job;

    private String university;

    private String email;

    private String password;

    private Role role = Role.Guest;

    private String activationToken;

    @Column(columnDefinition = "longtext")
    private String image;

    private String passwordResetToken;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Post> postList;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<Comment> commentList;

    public User() {
        this.id = null;
    }

    public User(Long userId) {
        this.id = userId;
    }

    boolean isDelete = false;


    public boolean isDelete() {
        return isDelete;
    }


    @PrePersist
    public void prePersist() {
        if (this.getCreateTime() == null) {
            this.setCreateTime(LocalDateTime.now());
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.setUpdateTime(LocalDateTime.now());
    }
}