package com.ticketing.controllers;

import com.ticketing.models.Configuration;
import com.ticketing.services.TicketService;
import com.ticketing.models.TicketPool;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/tickets")
@Validated
public class TicketController {

    private static final Logger logger = LoggerFactory.getLogger(TicketController.class);

    boolean status = false;

    @Autowired
    private TicketService ticketService;
    private TicketPool ticketPool;

    /**
     * Configures the ticketing system with the provided configuration.
     * @param config the configuration settings
     * @return a response entity with the status of the configuration
     */
    @PostMapping("/configure")
    public ResponseEntity<String> configureSystem(@Valid @RequestBody(required = false) Configuration config) {
        if (config == null) {
            logger.error("Configuration is missing in the request body");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Configuration is missing in the request body");
        }

        if (config.getMaxTicketCapacity() == null || config.getTotalTickets() == null) {
            logger.error("Required configuration values are missing");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Required configuration values are missing");
        }

        logger.info("Configuring system with max capacity: {} and total tickets: {}", config.getMaxTicketCapacity(), config.getTotalTickets());
        ticketService.initialize(config.getMaxTicketCapacity(), config.getTotalTickets(), config.getTicketReleaseRate(), config.getCustomerRetrievalRate());
        return ResponseEntity.ok(config.toString());
    }

    /**
     * Retrieves the current configuration settings of the system.
     * @return a response entity with the current configuration settings
     */
    @GetMapping("/configure")
    public ResponseEntity<Configuration> getConfiguration() {
        Configuration config = ticketService.getCurrentConfiguration();
        if (config == null) {
            logger.warn("Configuration settings are not available");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        logger.info("Returning current configuration settings");
        return ResponseEntity.ok(config);
    }

    /**
     * Starts the ticketing system.
     * @return a response entity with the status of the operation
     */
    @PostMapping("/start")
    public ResponseEntity<String> start() {
        logger.info("Starting system");
        status = true;
        return ResponseEntity.ok("System started successfully");
    }

    /**
     * Stops the ticketing system.
     * @return a response entity with the status of the operation
     */
    @PostMapping("/stop")
    public ResponseEntity<String> stop() {
        logger.info("Stopping system");
        status = false;
        ticketService.stop();
        return ResponseEntity.ok("System stopped successfully");
    }

    /**
     * Retrieves the current number of tickets in the pool.
     * @return a response entity with the current ticket count
     */
    @GetMapping("/count")
    public ResponseEntity<Integer> getTicketCount() {
        TicketPool ticketPool = ticketService.getTicketPool();
        if (ticketPool == null) {
            logger.warn("Ticket pool is null");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(0);
        }

        int count = ticketPool.getCount();
        logger.info("Current ticket count: {}", count);
        return ResponseEntity.ok(count);
    }

    /**
     * Retrieves the current status of the system (running or stopped).
     * @return a response entity with the current status of the system
     */
    @GetMapping("/status")
    public ResponseEntity<String> getStatus() {
        if (status) {
            logger.info("System is running");
            return ResponseEntity.ok("running");
        } else {
            logger.info("System is not running");
            return ResponseEntity.ok("stopped");
        }
    }

    /**
     * Adds a specified number of tickets to the pool.
     * @param numberOfTickets the number of tickets to add
     * @return a response entity with the status of the operation
     */
    @PostMapping("/add")
    public ResponseEntity<String> addTickets(@RequestParam int numberOfTickets) {
        if (numberOfTickets <= 0) {
            logger.error("Number of tickets must be greater than zero");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Number of tickets must be greater than zero");
        }

        TicketPool ticketPool = ticketService.getTicketPool();
        if (ticketPool == null) {
            logger.error("Ticket pool is null");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Ticket pool is not initialized");
        }

        logger.info("Adding {} tickets to the pool", numberOfTickets);
        synchronized (ticketPool) {
            for (int i = 0; i < numberOfTickets; i++) {
                if (!ticketPool.addTicket("TicketId-" + System.nanoTime())) {
                    logger.warn("Ticket pool is full. Could not add more tickets.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ticket pool is full. Could not add more tickets.");
                }
            }
        }
        return ResponseEntity.ok(numberOfTickets + " tickets added to the pool.");
    }

    /**
     * Removes a specified number of tickets from the pool.
     * @param numberOfTickets the number of tickets to remove
     * @return a response entity with the status of the operation
     */
    @PostMapping("/remove")
    public ResponseEntity<String> removeTickets(@RequestParam int numberOfTickets) {
        if (numberOfTickets <= 0) {
            logger.error("Number of tickets must be greater than zero");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Number of tickets must be greater than zero");
        }

        logger.info("Removing {} tickets from the pool", numberOfTickets);
        TicketPool ticketPool = ticketService.getTicketPool();
        synchronized (ticketPool) {
            for (int i = 0; i < numberOfTickets; i++) {
                String ticket = ticketPool.buyTicket();
                if (ticket == null) {
                    logger.warn("No more tickets available to remove.");
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No more tickets available to remove.");
                }
            }
        }
        return ResponseEntity.ok(numberOfTickets + " tickets removed from the pool.");
    }

    /**
     * Purchases a specified number of tickets from the pool.
     * @param numberOfTickets the number of tickets to purchase
     * @return a response entity with the status of the operation
     */
    @PostMapping("/buy")
    public ResponseEntity<String> buyTicket(@RequestParam int numberOfTickets) {
        if (numberOfTickets <= 0) {
            logger.error("Number of tickets must be greater than zero");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Number of tickets must be greater than zero");
        }

        if (status) {
            logger.info("Attempting to purchase {} tickets", numberOfTickets);
            TicketPool ticketPool = ticketService.getTicketPool();
            if (ticketPool == null) {
                logger.warn("Ticket configuration hasn't been set up yet.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Ticket configuration hasn't been set up yet.");
            }

            synchronized (ticketPool) {
                StringBuilder purchasedTickets = new StringBuilder();
                for (int i = 0; i < numberOfTickets; i++) {
                    String ticket = ticketPool.buyTicket();
                    if (ticket != null) {
                        logger.info("Ticket purchased: {}", ticket);
                        purchasedTickets.append(ticket).append("\n");
                    } else {
                        logger.warn("No more tickets available to purchase.");
                        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No more tickets available to purchase.");
                    }
                }
                return ResponseEntity.ok("Tickets purchased:\n" + purchasedTickets.toString());
            }
        } else {
            logger.warn("System is not running. Please start the system before purchasing tickets.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("System is not running. Please start the system before purchasing tickets.");
        }
    }

    /**
     * Saves the current data to the database.
     * @return a response entity with the status of the operation
     */
    @PostMapping("/save")
    public ResponseEntity<String> saveDB() {
        logger.info("Saving data to database");
        ticketService.saveDataToDatabase();
        return ResponseEntity.ok("Data saved to database.");
    }

    /**
     * Loads data from the database.
     * @return a response entity with the status of the operation
     */
    @GetMapping("/load")
    public ResponseEntity<String> loadDB() {
        logger.info("Loading data from database");
        ticketService.loadDataFromDatabase();
        return ResponseEntity.ok("Data loaded from database.");
    }
}