package com.elvan.hoaxify.services;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.exceptions.ActivationNotificationException;
import com.elvan.hoaxify.exceptions.NotUniqueEmailException;
import com.elvan.hoaxify.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
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
            emailService.sendActivationEmail(newUser.getEmail(), newUser.getActivationToken());
        } catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        } catch (MailException exception){
            throw new ActivationNotificationException();
        }
    }
}
