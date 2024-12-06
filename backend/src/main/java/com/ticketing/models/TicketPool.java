package com.ticketing.models;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

public class TicketPool {
    private final BlockingQueue<String> tickets;
    private static int maxCapacity;

    /**
     * Constructor to initialize the TicketPool with a maximum capacity.
     * @param maxCapacity the maximum number of tickets the pool can hold
     */
    public TicketPool(int maxCapacity) {
        this.tickets = new LinkedBlockingQueue<>();
        this.maxCapacity = maxCapacity;
    }

    /**
     * Adds a ticket to the pool if the pool is not full.
     * @param ticket the ticket to be added
     * @return true if the ticket was added, false if the pool is full
     */
    public synchronized boolean addTicket(String ticket) {
        if (tickets.size() < maxCapacity) {
            tickets.offer(ticket);
            return true;
        }
        return false;
    }

    /**
     * Purchases a ticket from the pool.
     * @return the purchased ticket, or null if no tickets are available
     */
    public synchronized String buyTicket() {
        return tickets.poll();
    }

    /**
     * Gets the current number of tickets in the pool.
     * @return the number of tickets in the pool
     */
    public synchronized int getCount() {
        return tickets.size();
    }

    /**
     * Removes a specific ticket from the pool.
     * @param ticket the ticket to be removed
     */
    public synchronized void removeTicket(String ticket) {
        tickets.remove(ticket);
    }
}