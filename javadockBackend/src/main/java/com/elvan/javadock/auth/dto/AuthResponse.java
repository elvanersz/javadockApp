package com.elvan.javadock.auth.dto;

import com.elvan.javadock.auth.Token;
import com.elvan.javadock.responses.UserResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private UserResponse user;
    private Token token;
}