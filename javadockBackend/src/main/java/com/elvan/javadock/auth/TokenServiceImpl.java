package com.elvan.javadock.auth;

import com.elvan.javadock.auth.dto.Credentials;
import com.elvan.javadock.entities.User;
import com.elvan.javadock.services.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
@AllArgsConstructor
public class TokenServiceImpl implements TokenService{

    private UserService userService;
    private PasswordEncoder passwordEncoder;

    @Override
    public Token createToken(User user, Credentials credentials) {
        String emailColonPassword = credentials.email() + ":" + credentials.password();

        String token = Base64.getEncoder().encodeToString(emailColonPassword.getBytes());

        return new Token("Basic", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        if(authorizationHeader == null) return null;

        var base64Encoded = authorizationHeader.split("Basic ")[1];
        var decoded = new String(Base64.getDecoder().decode(base64Encoded));
        var credentials = decoded.split(":");
        var email = credentials[0];
        var password = credentials[1];

        User user = userService.getUserByEmail(email);
        if (user == null) return null;
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return null;
        } else {
            return user;
        }
    }
}
