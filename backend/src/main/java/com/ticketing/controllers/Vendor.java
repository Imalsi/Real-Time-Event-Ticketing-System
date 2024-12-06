package com.ticketing.controllers;

import com.ticketing.models.TicketPool;

public class Vendor implements Runnable {
    private final TicketPool ticketPool;
    private final int vendorId;
    private final int ticketsPerBatch;
    private final int totalTickets;
    private int ticketsAdded = 0;

    /**
     * Constructor to initialize the Vendor with the ticket pool, vendor ID, tickets per batch, and total tickets.
     * @param ticketPool the ticket pool to which tickets will be added
     * @param vendorId the ID of the vendor
     * @param ticketsPerBatch the number of tickets to add per batch
     * @param totalTickets the total number of tickets to add
     */
    public Vendor(TicketPool ticketPool, int vendorId, int ticketsPerBatch, int totalTickets) {
        this.ticketPool = ticketPool;
        this.vendorId = vendorId;
        this.ticketsPerBatch = ticketsPerBatch;
        this.totalTickets = totalTickets;
    }

    /**
     * The run method to add tickets to the pool in batches until the total number of tickets is reached.
     * This method is executed when the thread is started.
     */
    @Override
    public void run() {
        try {
            while (ticketsAdded < totalTickets) {
                synchronized (ticketPool) {
                    for (int i = 0; i < ticketsPerBatch && ticketsAdded < totalTickets; i++) {
                        if (ticketPool.addTicket("Vendor-" + vendorId + "-Ticket-" + (ticketsAdded + 1))) {
                            ticketsAdded++;
                            System.out.println("Vendor " + vendorId + " added Ticket-" + ticketsAdded);
                        } else {
                            System.out.println("Vendor " + vendorId + " could not add tickets. Pool is full.");
                            break;
                        }
                    }
                }
                Thread.sleep(5000); // Simulate delay between batches
            }
            System.out.println("Vendor " + vendorId + " finished adding tickets.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.out.println("Vendor " + vendorId + " stopped.");
        }
    }
}