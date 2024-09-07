package com.javadock.services;

import com.javadock.entities.Job;
import com.javadock.repositories.JobRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobService {

    private JobRepository jobRepository;

    public List<Job> getAllJobs(){
        return jobRepository.findAll();
    }
}