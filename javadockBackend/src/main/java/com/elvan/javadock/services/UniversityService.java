package com.elvan.javadock.services;

import com.elvan.javadock.entities.University;
import com.elvan.javadock.repositories.UniversityRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UniversityService {

    private UniversityRepository universityRepository;

    public List<University> getAllUniversities(){
        return universityRepository.findAll();
    }
}
