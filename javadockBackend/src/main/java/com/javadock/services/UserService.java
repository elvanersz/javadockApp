package com.javadock.services;

import com.javadock.entities.User;
import com.javadock.enums.Role;
import com.javadock.exceptions.*;
import com.javadock.repositories.PostRepository;
import com.javadock.repositories.UserRepository;
import com.javadock.requests.AccountConfirmationRequest;
import com.javadock.requests.PasswordChangeRequest;
import com.javadock.requests.ProfileImageChangeRequest;
import com.javadock.requests.UpdateUserRequest;
import jakarta.annotation.Nullable;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.slf4j.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.UUID;

@Service
@AllArgsConstructor
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);

    private UserRepository userRepository;
    private PostRepository postRepository;
    private PasswordEncoder passwordEncoder;
    private EmailService emailService;

    @Transactional(rollbackOn = MailException.class)
    public void createOneUser(User newUser){
        validateNewUser(newUser);
        try {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setActivationToken(UUID.randomUUID().toString());
            userRepository.saveAndFlush(newUser);
            emailService.sendActivationEmail(newUser);
        } catch (Exception e){
            log.error(String.valueOf(e));
        }
    }

    public void activateUser(String activationToken) {
        User user = userRepository.findByActivationToken(activationToken);
        if (user == null){
            throw new BusinessException("javadock.activate.user.invalid");
        }
        user.setRole(Role.User);
        user.setActivationToken(null);
        userRepository.save(user);
    }

    public Page<User> getAllUsers(Pageable page, User currentUser) {
        if (currentUser == null){
            return userRepository.findByIsDeleteFalse(page);
        }
        return userRepository.findByIdNotAndIsDelete(currentUser.getId(), false, page);
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.user.not.found", Collections.singletonList(id)));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email);
        if(user == null){
            throw new BusinessException("javadock.email.not.found");
        }
        try {
            user.setPasswordResetToken(UUID.randomUUID().toString());
            emailService.sendPasswordResetEmail(user);
            userRepository.save(user);
        } catch (MailException mailException){
            throw new BusinessException("javadock.password.reset.email.failure");
        }

    }

    public void passwordReset(String passwordResetToken, @Nullable String newPassword) {
        User user = userRepository.findByPasswordResetToken(passwordResetToken);
        if(user == null){
            throw new BusinessException("javadock.password.reset.invalid");
        } else if(newPassword != null){
            user.setPassword(passwordEncoder.encode(newPassword));
            user.setPasswordResetToken(null);
            userRepository.save(user);
        }
    }

    public void passwordChangeById(Long id, PasswordChangeRequest passwordChangeRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.user.not.found", Collections.singletonList(id)));

        if(!passwordEncoder.matches(passwordChangeRequest.password(), user.getPassword())){
            throw new BusinessException("javadock.error.validation");
        } else {
            user.setPassword(passwordEncoder.encode(passwordChangeRequest.newPassword()));
            userRepository.save(user);
        }
    }

    public void deleteUserById(Long id){
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.user.not.found", Collections.singletonList(id)));
        user.setDelete(true);
        user.getPostList().forEach(post -> post.setDelete(true));
        userRepository.save(user);
        postRepository.saveAll(user.getPostList());
    }

    public void updateUserById(Long id, UpdateUserRequest updateUserRequest) {
        usernameIsUnique(id, updateUserRequest.username());

        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.user.not.found", Collections.singletonList(id)));
        user.setFirstName(updateUserRequest.firstName());
        user.setLastName(updateUserRequest.lastName());
        user.setUsername(updateUserRequest.username());
        user.setJob(updateUserRequest.job());
        user.setUniversity(updateUserRequest.university());

        userRepository.save(user);
    }

    public void profileImageChangeById(Long id, ProfileImageChangeRequest profileImageChangeRequest) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new BusinessException("javadock.user.not.found", Collections.singletonList(id)));
        user.setImage(profileImageChangeRequest.image());

        userRepository.save(user);
    }

    public void accountConfirmationByEmail(AccountConfirmationRequest accountConfirmationRequest) {
        User user = userRepository.findByEmail(accountConfirmationRequest.email());
        emailService.sendActivationEmail(user);
    }

    public void usernameIsUnique(Long id, String username){
        User user = userRepository.findByIdNotAndUsername(id, username);
        if (user != null){
            throw new BusinessException("javadock.constraints.username.NotUnique.message");
        }
    }

    public void validateNewUser(User newUser){
        if (userRepository.findByEmail(newUser.getEmail()) != null){
            throw new BusinessException("javadock.constraints.email.NotUnique.message");
        } else if (userRepository.findByUsername(newUser.getUsername()) != null) {
            throw new BusinessException("javadock.constraints.username.NotUnique.message");
        }
    }
}