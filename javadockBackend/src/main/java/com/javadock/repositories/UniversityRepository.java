package com.javadock.repositories;

import com.javadock.entities.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long>{
}
