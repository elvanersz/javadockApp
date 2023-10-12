package com.elvan.javadock.services;

import com.elvan.javadock.entities.Job;
import com.elvan.javadock.repositories.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class JobService {

    private JobRepository jobRepository;

    @GetMapping("/api/v1/jobs")
    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }
}