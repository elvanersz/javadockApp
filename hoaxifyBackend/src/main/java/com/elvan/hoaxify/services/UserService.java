package com.elvan.hoaxify.services;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.exceptions.EmptyFieldException;
import com.elvan.hoaxify.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public User createOneUser(User newUser){
        if(newUser.getUsername().isBlank()){
            throw new EmptyFieldException("This field cannot be empty");
        }

        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        return userRepository.save(newUser);
    }
}
