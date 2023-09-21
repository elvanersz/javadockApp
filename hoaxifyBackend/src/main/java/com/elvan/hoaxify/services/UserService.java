package com.elvan.hoaxify.services;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.exceptions.NotUniqueEmailException;
import com.elvan.hoaxify.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public User createOneUser(User newUser){
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setActivationToken(UUID.randomUUID().toString());
            return userRepository.save(newUser);
        } catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        }
    }
}
