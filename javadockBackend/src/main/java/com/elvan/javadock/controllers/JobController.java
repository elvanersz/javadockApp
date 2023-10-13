package com.elvan.javadock.controllers;

import com.elvan.javadock.entities.Job;
import com.elvan.javadock.services.JobService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class JobController {

    private JobService jobService;

    @GetMapping("/api/v1/jobs")
    public List<Job> getAllJobs(){
        return jobService.getAllJobs();
    }
}