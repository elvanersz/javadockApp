package com.elvan.javadock.controllers;

import com.elvan.javadock.entities.University;
import com.elvan.javadock.services.UniversityService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
public class UniversityController {

    private UniversityService universityService;

    @GetMapping("api/v1/universities")
    public List<University> getAllUniversities(){
        return universityService.getAllUniversities();
    }
}
