package com.elvan.hoaxify.repositories;

import com.elvan.hoaxify.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {


}
