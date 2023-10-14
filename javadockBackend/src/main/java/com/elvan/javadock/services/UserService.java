package com.elvan.javadock.services;

import com.elvan.javadock.entities.User;
import com.elvan.javadock.enums.Role;
import com.elvan.javadock.exceptions.ActivationNotificationException;
import com.elvan.javadock.exceptions.InvalidTokenException;
import com.elvan.javadock.exceptions.NotFoundException;
import com.elvan.javadock.exceptions.NotUniqueEmailException;
import com.elvan.javadock.repositories.UserRepository;
import com.elvan.javadock.responses.UserResponse;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;

    @Transactional(rollbackOn = MailException.class)
    public void createOneUser(User newUser){
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setActivationToken(UUID.randomUUID().toString());
            userRepository.saveAndFlush(newUser);
            emailService.sendActivationEmail(newUser);
        } catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        } catch (MailException exception){
            throw new ActivationNotificationException();
        }
    }

    public void activateUser(String activationToken) {
        User user = userRepository.findByActivationToken(activationToken);
        if(user == null){
            throw new InvalidTokenException();
        }
        user.setRole(Role.User);
        user.setActive(true);
        user.setActivationToken(null);
        userRepository.save(user);
    }

    public Page<User> getAllUsers(Pageable page) {
        return userRepository.findAll(page);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
}
