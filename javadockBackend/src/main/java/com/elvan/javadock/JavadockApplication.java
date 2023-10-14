package com.elvan.javadock;

import com.elvan.javadock.entities.Job;
import com.elvan.javadock.entities.University;
import com.elvan.javadock.entities.User;
import com.elvan.javadock.enums.Role;
import com.elvan.javadock.repositories.UserRepository;
import io.swagger.v3.oas.models.OpenAPI;

import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.sql.Date;
import java.time.LocalDate;
import java.time.Month;
import java.util.Locale;

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


	/*
	@Bean
	CommandLineRunner userCreator(UserRepository userRepository){
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		return new CommandLineRunner() {
			Job job = new Job(1L);
			University university = new University(139L);

			@Override
			public void run(String... args) throws Exception {
				for (var i=1 ; i<=25 ; i++){
					User user = new User();
					user.setFirstName("firstname" + i);
					user.setLastName("lastname" + i);
					user.setUsername("username" + i);
					user.setJob(job);
					user.setUniversity(university);
					user.setBirthDate(LocalDate.of(2020, 10, 10));
					user.setEmail("email" + i + "@gmail.com");
					user.setPassword(passwordEncoder.encode("password" + i));
					user.setRole(Role.USER);
					user.setActive(true);
					userRepository.save(user);
				}
			}
		};
	}

	 */

}