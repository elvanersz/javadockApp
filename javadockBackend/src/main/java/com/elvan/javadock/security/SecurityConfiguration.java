package com.elvan.javadock.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private PasswordEncoder passwordEncoder;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {

        //AntPathRequestMatcher ile verilen url secure olurken anyRequest.permitAll ile diğerlerine uygulanmasın.
        httpSecurity.authorizeHttpRequests((authentication) ->
                authentication.requestMatchers(
                        AntPathRequestMatcher.antMatcher("/api/v1/user/{id}"))
                        .authenticated()
                        .anyRequest()
                        .permitAll()
        );

        httpSecurity.httpBasic(httpBasic -> httpBasic.authenticationEntryPoint(new AuthEntryPoint()));
        httpSecurity.csrf(csrf -> csrf.disable());
        return httpSecurity.build();
    }
}