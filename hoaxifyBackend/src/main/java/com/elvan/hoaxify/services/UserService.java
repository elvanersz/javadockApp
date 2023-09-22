package com.elvan.hoaxify.services;

import com.elvan.hoaxify.entities.User;
import com.elvan.hoaxify.exceptions.NotUniqueEmailException;
import com.elvan.hoaxify.repositories.UserRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Properties;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Transactional(rollbackOn = MailException.class)
    public void createOneUser(User newUser){
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setActivationToken(UUID.randomUUID().toString());
            userRepository.save(newUser);
            sendActivationEmail(newUser);
        } catch (DataIntegrityViolationException exception){
            throw new NotUniqueEmailException();
        }
    }

    private void sendActivationEmail(User newUser) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("javadockblog@gmail.com");
        message.setTo(newUser.getEmail());
        message.setSubject("Account Activation");
        message.setText("http://localhost:5173/activation/" + newUser.getActivationToken());
        getJavaMailSender().send(message);
    }

    public JavaMailSender getJavaMailSender(){
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.ethereal.email");
        mailSender.setPort(587);
        mailSender.setUsername("denis.crona@ethereal.email");
        mailSender.setPassword("Q9ZEYVS4BrD5KVHMdr");

        Properties properties = mailSender.getJavaMailProperties();
        properties.put("mail.smtp.starttls.enable", "true");

        return mailSender;
    }
}
