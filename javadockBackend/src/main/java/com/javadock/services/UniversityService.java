package com.javadock.services;

import com.javadock.entities.University;
import com.javadock.repositories.UniversityRepository;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UniversityService {

    private UniversityRepository universityRepository;

    public List<University> getAllUniversities(){
        Pageable pageable = PageRequest.of(0, 50);
        return universityRepository.findAll(pageable).getContent();
    }
}
