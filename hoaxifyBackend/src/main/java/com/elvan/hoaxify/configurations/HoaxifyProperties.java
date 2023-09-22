package com.elvan.hoaxify.configurations;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring")
public class HoaxifyProperties {

    private Mail mail;
    private Client client;

    public static record Mail(
            String username,
            String password,
            String host,
            int port
    ){}
    public static record Client(
            String host
    ){}

    public Mail getMail() {
        return mail;
    }
    public void setMail(Mail mail) {
        this.mail = mail;
    }

    public Client getClient() {
        return client;
    }
    public void setClient(Client client) {
        this.client = client;
    }
}