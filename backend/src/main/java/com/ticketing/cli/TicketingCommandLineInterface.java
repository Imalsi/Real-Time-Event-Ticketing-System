package com.ticketing.cli;

import com.ticketing.models.TicketPool;
import com.ticketing.models.TicketSale;
import com.ticketing.repositories.TicketingRepository;
import com.ticketing.services.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.InputMismatchException;
import java.util.Scanner;

import static java.lang.Thread.sleep;

@Component
public class TicketingCommandLineInterface implements CommandLineRunner {

    @Autowired
    private TicketService ticketService;

    private static final Logger logger = LoggerFactory.getLogger(TicketingCommandLineInterface.class);

    /**
     * The main entry point of the command-line interface.
     * @param args command-line arguments
     * @throws InterruptedException if the thread is interrupted
     */
    @Override
    public void run(String... args) throws InterruptedException {
        try (Scanner scanner = new Scanner(System.in)) {
            sleep(3000);

            System.out.println("Welcome to the Real-Time Ticketing System!");
            System.out.println("Set up your configuration:");

            int totalTickets = getIntInput(scanner, "Total Tickets: ");
            int ticketReleaseRate = getIntInput(scanner, "Ticket Release Rate (tickets per batch): ");
            int customerRetrievalRate = getIntInput(scanner, "Customer Retrieval Rate (milliseconds between purchases): ");
            int maxTicketCapacity = getIntInput(scanner, "Max Ticket Capacity in Pool: ");

            // Initialize the Ticket Pool
            ticketService.initialize(maxTicketCapacity, totalTickets, ticketReleaseRate, customerRetrievalRate);
            boolean exit = true;
            while (exit) {
                System.out.println("\nChoose Mode:");
                System.out.println("1. Simulator Mode (Vendors and Customers run automatically)");
                System.out.println("2. Manual Mode (Manually add and buy tickets)");
                System.out.println("3. Exit");
                int mode = getIntInput(scanner, "Enter your choice: ");

                if (mode == 1) {
                    startSimulatorMode(scanner);
                } else if (mode == 2) {
                    startManualMode(scanner);
                } else if (mode == 3) {
                    exit = false;
                    System.out.println("Console mode Exiting.");
                } else {
                    System.out.println("Invalid choice! Exiting.");
                }
            }
        } catch (Exception e) {
            logger.error("An error occurred: ", e);
        }
    }

    /**
     * Starts the simulator mode where vendors and customers run automatically.
     * @param scanner the scanner to read user input
     */
    private void startSimulatorMode(Scanner scanner) {
        System.out.println("\nStarting Simulator Mode...");
        int ticketReleaseRate = getIntInput(scanner, "Ticket Release Rate (tickets per batch): ");
        int customerRetrievalRate = getIntInput(scanner, "Customer Retrieval Rate (milliseconds between purchases): ");

        ticketService.startVendorsAndCustomers(ticketReleaseRate, customerRetrievalRate);

        System.out.println("Type 'status' to check ticket count or 'stop' to end the simulation.");
        String command;
        do {
            command = scanner.next().toLowerCase();
            if ("status".equals(command)) {
                System.out.println("Current Ticket Count: " + ticketService.getTicketPool().getCount());
            }
        } while (!"stop".equals(command));

        ticketService.stop();
        System.out.println("Simulation stopped.");
    }

    /**
     * Starts the manual mode where users can manually add and buy tickets.
     * @param scanner the scanner to read user input
     */
    private void startManualMode(Scanner scanner) {
        System.out.println("\nStarting Manual Mode...");
        TicketPool ticketPool = ticketService.getTicketPool();
        TicketingRepository ticketRepo = ticketService.getTicketRepository();

        String command;
        do {
            System.out.print("\nEnter a command (add, buy, status, save, load, exit): ");
            command = scanner.next().toLowerCase();

            switch (command) {
                case "add":
                    int ticketsToAdd = getIntInput(scanner, "Enter number of tickets to add: ");
                    synchronized (ticketPool) {
                        for (int i = 0; i < ticketsToAdd; i++) {
                            if (!ticketPool.addTicket("Manual-Ticket-" + System.nanoTime())) {
                                System.out.println("Ticket pool is full. Could not add more tickets.");
                                break;
                            }
                        }
                        System.out.println(ticketsToAdd + " tickets added to the pool.");
                    }
                    break;

                case "buy":
                    synchronized (ticketPool) {
                        String ticket = ticketPool.buyTicket();
                        if (ticket != null) {
                            System.out.println("Ticket purchased: " + ticket);
                            saveSaleToDatabase(ticketRepo, ticket);
                        } else {
                            System.out.println("No tickets available to purchase.");
                        }
                    }
                    break;

                case "status":
                    System.out.println("Current Ticket Count: " + ticketPool.getCount());
                    break;

                case "save":
                    saveDataToDatabase(ticketRepo);
                    break;

                case "load":
                    loadDataFromDatabase(ticketRepo);
                    break;

                case "exit":
                    System.out.println("Exiting Manual Mode...");
                    break;

                default:
                    System.out.println("Invalid command! Try 'add', 'buy', 'status', 'save', 'load', or 'exit'.");
            }
        } while (!"exit".equals(command));
    }

    /**
     * Prompts the user for an integer input.
     * @param scanner the scanner to read user input
     * @param prompt the prompt message
     * @return the integer input from the user
     */
    private int getIntInput(Scanner scanner, String prompt) {
        while (true) {
            try {
                System.out.print(prompt);
                return scanner.nextInt();
            } catch (InputMismatchException e) {
                logger.error("Invalid input. Please enter a valid number.");
                System.out.println("\nInvalid input.\n ");
                scanner.next();
            }
        }
    }

    /**
     * Saves dummy data to the database.
     * @param repo the ticketing repository
     */
    private void saveDataToDatabase(TicketingRepository repo) {
        TicketSale sale = new TicketSale();
        sale.setTicketId("Ticket-" + System.nanoTime());
        sale.setCustomerId(1);
        sale.setTicketDetails("Sample ticket");
        repo.save(sale);
        System.out.println("Data saved to database.");
    }

    /**
     * Loads data from the database and prints it.
     * @param repo the ticketing repository
     */
    private void loadDataFromDatabase(TicketingRepository repo) {
        var sales = repo.findAll();
        sales.forEach(sale -> {
            System.out.println("Loaded Ticket Sale: " + sale.getTicketId());
        });
    }

    /**
     * Saves a ticket sale to the database.
     * @param repo the ticketing repository
     * @param ticket the ticket to be saved
     */
    private void saveSaleToDatabase(TicketingRepository repo, String ticket) {
        TicketSale sale = new TicketSale();
        sale.setTicketId(ticket);
        sale.setCustomerId(1);
        sale.setTicketDetails("Ticket details...");
        repo.save(sale);
    }
}