package com.ticketing;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
public class TicketBookingSystemApplication {

    /**
     * The main method that serves as the entry point for the Spring Boot application.
     * @param args command-line arguments
     */
    public static void main(String[] args) {
        //This will start the application
        SpringApplication.run(TicketBookingSystemApplication.class, args);
    }
}
