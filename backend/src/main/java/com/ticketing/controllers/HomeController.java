package com.ticketing.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    /**
     * Handles the root URL ("/") and returns a welcome message.
     * @return a welcome message indicating the server is running
     */
    @GetMapping("/")
    public String home() {
        return "Ticket Booking App Server Up and Running!";
    }
}