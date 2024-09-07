package com.javadock.auth;

import com.javadock.auth.dto.Credentials;
import com.javadock.entities.User;

public interface TokenService {

    Token createToken(User user, Credentials credentials);

    User verifyToken(String authorizationHeader);
}
