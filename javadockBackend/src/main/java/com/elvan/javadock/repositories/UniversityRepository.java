package com.elvan.javadock.repositories;

import com.elvan.javadock.entities.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Long>{
}
