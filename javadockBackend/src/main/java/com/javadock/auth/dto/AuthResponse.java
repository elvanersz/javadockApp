package com.javadock.auth.dto;

import com.javadock.auth.Token;
import com.javadock.responses.UserDetailResponse;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private UserDetailResponse user;
    private Token token;
}