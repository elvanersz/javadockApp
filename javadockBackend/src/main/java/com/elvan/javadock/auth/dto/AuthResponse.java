package com.elvan.javadock.auth.dto;

import com.elvan.javadock.Token;
import com.elvan.javadock.responses.UserResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private UserResponse userResponse;
    private Token token;
}