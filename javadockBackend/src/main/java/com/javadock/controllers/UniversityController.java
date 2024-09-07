package com.javadock.controllers;

import com.javadock.entities.University;
import com.javadock.services.UniversityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("api/v1/universities")
public class UniversityController {

    private UniversityService universityService;

    @GetMapping
    public List<University> getAllUniversities(){
        return universityService.getAllUniversities();
    }
}
