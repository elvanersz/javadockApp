package com.javadock.controllers;

import com.javadock.auth.TokenServiceImpl;
import com.javadock.requests.*;
import com.javadock.responses.UserDetailResponse;
import com.javadock.responses.UserListResponse;
import com.javadock.services.UserService;
import com.javadock.validation.GenericMessage;
import com.javadock.validation.Messages;
import jakarta.annotation.Nullable;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/users")
public class UserController {

    private UserService userService;
    private MessageSource messageSource;
    private TokenServiceImpl tokenServiceImpl;

    @PostMapping
    public GenericMessage createUser(@Valid @RequestBody CreateUserRequest newUser) {
        userService.createOneUser(newUser.toUser());
        String message = Messages.getMessageForLocale("javadock.create.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/{activationToken}/active")
    public GenericMessage activateUser(@PathVariable String activationToken) {
        userService.activateUser(activationToken);
        String message = Messages.getMessageForLocale("javadock.activate.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @GetMapping
    public Page<UserListResponse> getAllUsers(Pageable page, @RequestHeader(value = "Authorization", required = false) String authorizationHeader) {
        var currentUser = tokenServiceImpl.verifyToken(authorizationHeader);
        return userService.getAllUsers(page, currentUser).map(UserListResponse::new);
    }

    @GetMapping("/{id}")
    UserDetailResponse getUserById(@PathVariable Long id) {
        return new UserDetailResponse(userService.getUserById(id));
    }

    @PostMapping("/request-password-reset")
    public GenericMessage requestPasswordReset(@Valid @RequestBody PasswordResetMailRequest passwordResetMailRequest){
        userService.requestPasswordReset(passwordResetMailRequest.email());
        String message = Messages.getMessageForLocale("javadock.password.reset.mail.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/password-reset/{passwordResetToken}")
    public GenericMessage passwordReset(@PathVariable String passwordResetToken,
                                        @Valid @RequestBody @Nullable PasswordResetRequest passwordResetRequest){
        if(passwordResetRequest != null){
            userService.passwordReset(passwordResetToken, passwordResetRequest.password());
        } else {
            userService.passwordReset(passwordResetToken, null);
        }
        String message = Messages.getMessageForLocale("javadock.password.reset.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/password-change/{id}")
    public GenericMessage passwordChangeById(@PathVariable Long id,
                                             @Valid @RequestBody PasswordChangeRequest passwordChangeRequest){
        userService.passwordChangeById(id, passwordChangeRequest);
        String message = Messages.getMessageForLocale("javadock.password.change.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @DeleteMapping("/{id}")
    public GenericMessage deleteUserById(@PathVariable Long id){
        userService.deleteUserById(id);
        String message = Messages.getMessageForLocale("javadock.delete.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/{id}")
    public GenericMessage updateUserById(@PathVariable Long id,
                                         @Valid @RequestBody UpdateUserRequest updateUserRequest){
        userService.updateUserById(id, updateUserRequest);
        String message = Messages.getMessageForLocale("javadock.update.user.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PatchMapping("/profile-image-change/{id}")
    public GenericMessage profileImageChangeById(@PathVariable Long id,
                                                 @Valid @RequestBody ProfileImageChangeRequest profileImageChangeRequest){
        userService.profileImageChangeById(id, profileImageChangeRequest);
        String message = Messages.getMessageForLocale("javadock.profile.image.change.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }

    @PostMapping("account-confirmation")
    public GenericMessage accountConfirmationByEmail(@RequestBody AccountConfirmationRequest accountConfirmationRequest){
        userService.accountConfirmationByEmail(accountConfirmationRequest);
        String message = Messages.getMessageForLocale("javadock.account.confirmation.success.message",
                LocaleContextHolder.getLocale());
        return new GenericMessage(message);
    }
}