package com.ticketing.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DotenvConfig {

    /**
     * Creates and configures a Dotenv bean to load environment variables from a .env file.
     * @return the configured Dotenv instance
     */
    @Bean
    public Dotenv dotenv() {
        return Dotenv.configure().load();
    }
}