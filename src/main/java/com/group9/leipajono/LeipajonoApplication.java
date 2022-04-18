package com.group9.leipajono;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class LeipajonoApplication {

	public static void main(String[] args) {
		SpringApplication.run(LeipajonoApplication.class, args);
	}
}
