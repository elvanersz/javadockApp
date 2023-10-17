package com.elvan.javadock.auth;

import com.elvan.javadock.auth.dto.Credentials;
import com.elvan.javadock.entities.User;
import org.springframework.stereotype.Service;

import java.util.Base64;

@Service
public class TokenServiceImpl implements TokenService{

    @Override
    public Token createToken(User user, Credentials credentials) {
        String emailColonPassword = credentials.email() + ":" + credentials.password();

        String token = Base64.getEncoder().encodeToString(emailColonPassword.getBytes());

        return new Token("Basic", token);
    }

    @Override
    public User verifyToken(String authorizationHeader) {
        throw new UnsupportedOperationException("Unimplemented method 'verifyToken'");
    }
}
