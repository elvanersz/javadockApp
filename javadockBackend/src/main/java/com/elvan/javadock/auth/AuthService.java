package com.elvan.javadock.auth;

import com.elvan.javadock.auth.dto.AuthResponse;
import com.elvan.javadock.auth.dto.Credentials;
import com.elvan.javadock.entities.User;
import com.elvan.javadock.exceptions.AuthenticationException;
import com.elvan.javadock.responses.UserResponse;
import com.elvan.javadock.services.UserService;
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
            throw new AuthenticationException();
        }else if(!passwordEncoder.matches(credentials.password(), user.getPassword())){
            throw new AuthenticationException();
        }

        Token token = tokenService.createToken(user, credentials);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setToken(token);
        authResponse.setUser(new UserResponse(user));

        return authResponse;
    }
}