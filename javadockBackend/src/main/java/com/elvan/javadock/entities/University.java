package com.elvan.javadock.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "university")
public class University {

    @Id
    private Long universityId;

    @Column(name = "universityName")
    private String universityName;
}
