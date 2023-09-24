package com.elvan.javadock;

import io.swagger.v3.oas.models.OpenAPI;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class,
								ThymeleafAutoConfiguration.class})
public class JavadockApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavadockApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public OpenAPI customOpenApı(@Value("${application-decription}") String description,
								 @Value("${application-version}") String version){
		return new OpenAPI()
				.info(new Info()
				.title("javadock App")
				.version(version)
				.description(description)
				.license(new License().name("javadock App Lisence")));
	}
}