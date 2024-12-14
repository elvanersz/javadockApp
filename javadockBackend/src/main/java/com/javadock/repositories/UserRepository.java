package com.javadock.repositories;

import com.javadock.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);

    User findByUsername(String username);

    User findByActivationToken(String activationToken);

    Page<User> findByIdNotAndIsDelete(Long id, Boolean isDelete, Pageable page);

    User findByPasswordResetToken(String passwordResetToken);

    User findByIdNotAndUsername(Long Id, String username);

    Page<User> findByIsDeleteFalse(Pageable page);
}