package com.javadock;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.autoconfigure.thymeleaf.ThymeleafAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@SpringBootApplication(exclude = {ThymeleafAutoConfiguration.class, SecurityAutoConfiguration.class})
public class JavadockApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavadockApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	/*@Bean
	public OpenAPI customOpenApi(@Value("${application-description}") String description,
								 @Value("${application-version}") String version){
		return new OpenAPI()
				.info(new Info()
				.title("javadock App")
				.version(version)
				.description(description)
				.license(new License().name("javadock App Lisence")));
	}*/


	/*
	@Bean
	CommandLineRunner userCreator(UserRepository userRepository){
		PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

		return new CommandLineRunner() {
			Job job = new Job(1L);
			University university = new University(139L);

			@Override
			public void run(String... args) {
				for (var i=1 ; i<=25 ; i++){
					User user = new User();
					user.setFirstName("firstname" + i);
					user.setLastName("lastname" + i);
					user.setUsername("username" + i);
					user.setJob(job);
					user.setUniversity(university);
					user.setEmail("email" + i + "@gmail.com");
					user.setPassword(passwordEncoder.encode("password" + i));
					user.setRole(Role.User);
					user.setActive(true);
					userRepository.save(user);
				}
			}
		};
	}
	*/
}