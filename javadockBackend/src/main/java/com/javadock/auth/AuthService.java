package com.javadock.auth;

import com.javadock.auth.dto.AuthResponse;
import com.javadock.auth.dto.Credentials;
import com.javadock.entities.User;
import com.javadock.enums.Role;
import com.javadock.exceptions.BusinessException;
import com.javadock.responses.UserDetailResponse;
import com.javadock.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthService {

    private UserService userService;
    private PasswordEncoder passwordEncoder;
    private TokenService tokenService;

    public AuthResponse authenticate(Credentials credentials){
        User user = userService.getUserByEmail(credentials.email());
        if (user == null){
            throw new BusinessException("javadock.auth.invalid.credentials");
        } else if (!passwordEncoder.matches(credentials.password(), user.getPassword())){
            throw new BusinessException("javadock.auth.invalid.credentials");
        } else if (user.getRole() == Role.Guest ) {
            throw new BusinessException("javadock.unconfirmed.account");
        }

        Token token = tokenService.createToken(user, credentials);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUser(new UserDetailResponse(user));

        return authResponse;
    }
}