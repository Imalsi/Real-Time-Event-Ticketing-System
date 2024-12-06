package com.ticketing.services;

import com.ticketing.models.Configuration;
import com.ticketing.models.TicketPool;
import com.ticketing.models.TicketSale;
import com.ticketing.repositories.TicketingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private TicketPool ticketPool;
    private int totalTickets = 0;
    private boolean isRunning = false;
    private Configuration currentConfiguration;

    @Autowired
    private TicketingRepository ticketRepository;

    /**
     * Initializes the ticket service with the specified maximum capacity and total tickets.
     * @param maxCapacity the maximum capacity of the ticket pool
     * @param totalTickets the total number of tickets to be added
     */
    public void initialize(int maxCapacity, int totalTickets) {
        this.ticketPool = new TicketPool(maxCapacity);
        this.totalTickets = totalTickets;
        this.currentConfiguration = new Configuration();
        this.currentConfiguration.setMaxTicketCapacity(maxCapacity);
        this.currentConfiguration.setTotalTickets(totalTickets);
    }

    /**
     * Initializes the ticket service with the specified parameters.
     * @param maxCapacity the maximum capacity of the ticket pool
     * @param totalTickets the total number of tickets to be added
     * @param ticketReleaseRate the rate at which tickets are released
     * @param customerRetrievalRate the rate at which customers retrieve tickets
     */
    public void initialize(int maxCapacity, int totalTickets, int ticketReleaseRate, int customerRetrievalRate) {
        this.ticketPool = new TicketPool(maxCapacity);
        this.totalTickets = totalTickets;
        this.currentConfiguration = new Configuration();
        this.currentConfiguration.setMaxTicketCapacity(maxCapacity);
        this.currentConfiguration.setTotalTickets(totalTickets);
        this.currentConfiguration.setTicketReleaseRate(ticketReleaseRate);
        this.currentConfiguration.setCustomerRetrievalRate(customerRetrievalRate);
    }

    /**
     * Gets the current configuration of the ticket service.
     * @return the current configuration
     */
    public Configuration getCurrentConfiguration() {
        return currentConfiguration;
    }

    /**
     * Gets the ticket pool.
     * @return the ticket pool
     */
    public TicketPool getTicketPool() {
        return ticketPool;
    }

    /**
     * Gets the ticket repository.
     * @return the ticket repository
     */
    public TicketingRepository getTicketRepository() {
        return ticketRepository;
    }

    /**
     * Starts the vendor and customer threads with the specified rates.
     * @param ticketReleaseRate the rate at which tickets are released
     * @param customerRetrievalRate the rate at which customers retrieve tickets
     */
    public void startVendorsAndCustomers(int ticketReleaseRate, int customerRetrievalRate) {
        if (isRunning) return;

        isRunning = true;

        // Vendor thread to add tickets
        new Thread(() -> {
            int ticketsAdded = 0;
            while (ticketsAdded < totalTickets) {
                synchronized (ticketPool) {
                    for (int i = 0; i < ticketReleaseRate; i++) {
                        if (ticketsAdded >= totalTickets || !ticketPool.addTicket("Ticket-" + ticketsAdded)) break;
                        ticketsAdded++;
                    }
                }
                try {
                    Thread.sleep(5000); // 5 seconds
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();

        // Customer thread to buy tickets
        new Thread(() -> {
            while (isRunning) {
                synchronized (ticketPool) {
                    String ticket = ticketPool.buyTicket();
                    if (ticket != null) {
                        System.out.println("Customer purchased: " + ticket);
                        saveSaleToDatabase(ticket);
                    }
                }
                try {
                    Thread.sleep(customerRetrievalRate);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }).start();
    }

    /**
     * Stops the vendor and customer threads.
     */
    public void stop() {
        isRunning = false;
    }

    /**
     * Saves a ticket sale to the database.
     * @param ticket the ticket to be saved
     */
    private void saveSaleToDatabase(String ticket) {
        TicketSale sale = new TicketSale();
        sale.setTicketId(ticket);
        sale.setCustomerId(1); // Dummy customer ID
        sale.setTicketDetails("Ticket details...");
        ticketRepository.save(sale); // Save to database
    }

    /**
     * Saves dummy data to the database.
     */
    public void saveDataToDatabase() {
        TicketSale sale = new TicketSale();
        sale.setTicketId("Ticket-" + System.nanoTime());
        sale.setCustomerId(1); // Dummy customer ID
        sale.setTicketDetails("Ticket details...");
        ticketRepository.save(sale);  // Save to database
    }

    /**
     * Loads data from the database and prints it.
     */
    public void loadDataFromDatabase() {
        var sales = ticketRepository.findAll();
        sales.forEach(sale -> {
            System.out.println("Loaded Ticket Sale: " + sale.getTicketId());
        });
    }
}