package com.elvan.javadock.services;

import com.elvan.javadock.configurations.EmailConfiguration;
import com.elvan.javadock.entities.User;
import com.elvan.javadock.exceptions.ActivationNotificationException;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.UnsupportedEncodingException;

@AllArgsConstructor
@Service
public class EmailService {

    private JavaMailSender javaMailSender;
    private EmailConfiguration emailConfiguration;
    private final Environment environment;
    private final TemplateEngine htmlTemplateEngine;

    private static final String TEMPLATE_NAME = "ValidationEmailPage";
    private static final String SPRING_LOGO_IMAGE = "templates/images/javadock.png";
    private static final String PNG_MIME = "image/png";
    private static final String MAIL_SUBJECT = "Registration Confirmation";

    public void sendActivationEmail(User newUser){
        String url = emailConfiguration.getClient().host() + "/activation/" + newUser.getActivationToken();

        try {
            final MimeMessage mimeMessage = this.javaMailSender.createMimeMessage();
            final MimeMessageHelper email;
            email = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            email.setTo(newUser.getEmail());
            email.setSubject(MAIL_SUBJECT);
            email.setFrom(new InternetAddress(emailConfiguration.getMail().username(), "Javadock"));

            final Context ctx = new Context(LocaleContextHolder.getLocale());
            ctx.setVariable("name", newUser.getFirstName() + " " + newUser.getLastName());
            ctx.setVariable("username", newUser.getUsername());
            ctx.setVariable("email", newUser.getEmail());
            ctx.setVariable("url", url);
            ctx.setVariable("javadockLogo", SPRING_LOGO_IMAGE);

            final String htmlContent = this.htmlTemplateEngine.process(TEMPLATE_NAME, ctx);

            email.setText(htmlContent, true);

            ClassPathResource clr = new ClassPathResource(SPRING_LOGO_IMAGE);

            email.addInline("javadockLogo", clr, PNG_MIME);

            javaMailSender.send(mimeMessage);

        }catch (UnsupportedEncodingException | MessagingException e){
            throw new ActivationNotificationException();
        }
    }
}