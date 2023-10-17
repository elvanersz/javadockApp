package com.elvan.javadock.auth;

import com.elvan.javadock.auth.dto.Credentials;
import com.elvan.javadock.entities.User;

public interface TokenService {

    Token createToken(User user, Credentials credentials);

    User verifyToken(String authorizationHeader);
}
