package com.elvan.javadock.repositories;

import com.elvan.javadock.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByUsername(String username);

    User findByActivationToken(String activationToken);

    Page<User> findByIdNot(Long id, Pageable page);

    User findByPasswordResetToken(String passwordResetToken);
}