package com.elvan.javadock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "university")
public class University {

    @Id
    private Long universityId;

    @Column(name = "universityName")
    private String universityName;

    @JsonIgnore
    @OneToMany(mappedBy = "university")
    private List<User> userList;

    public University(Long universityId) {
        this.universityId = universityId;
    }
}
