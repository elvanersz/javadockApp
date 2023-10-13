package com.elvan.javadock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "job")
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;

    @Column(name = "jobName")
    private String jobName;

    @JsonIgnore
    @OneToMany(mappedBy = "job")
    private List<User> userList;

    public Job(Long jobId) {
        this.jobId = jobId;
    }
}