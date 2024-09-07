package com.javadock.controllers;

import com.javadock.entities.Job;
import com.javadock.services.JobService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/jobs")
public class JobController {

    private JobService jobService;

    @GetMapping
    public List<Job> getAllJobs(){
        return jobService.getAllJobs();
    }
}