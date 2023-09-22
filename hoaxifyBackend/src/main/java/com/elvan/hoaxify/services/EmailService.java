package com.elvan.hoaxify.services;

import com.elvan.hoaxify.configurations.HoaxifyProperties;
import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

@AllArgsConstructor
@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    private HoaxifyProperties hoaxifyProperties;

    /*public void sendActivationEmail(String email, String activationToken) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("blogjavadock@gmail.com");
        message.setTo(email);
        message.setSubject("Java Dock Account Activation");
        message.setText("http://localhost:5173/activation/" + activationToken);
        javaMailSender.send(message);
    }*/

    public void sendActivationEmail(String email, String activationToken) {
        MimeMessagePreparator preparatory = message -> {
            MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED, "UTF-8");
            helper.setFrom(hoaxifyProperties.getMail().username(), "Java Dock");
            helper.setTo(email);
            helper.setSubject("Java Dock Account Activation");
            helper.setText(hoaxifyProperties.getMail().host() + "/activation/" + activationToken);
        };

        javaMailSender.send(preparatory);
    }
}