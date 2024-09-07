package com.javadock.auth;

import com.javadock.auth.dto.AuthResponse;
import com.javadock.auth.dto.Credentials;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class AuthController {

    private AuthService authService;

    @PostMapping("/api/v1/auth")
    public AuthResponse handleAuthentication(@Valid @RequestBody Credentials credentials){
        return authService.authenticate(credentials);
    }
}