package com.ticketing.models;

import com.sun.istack.NotNull;
import javax.validation.constraints.Min;

public class Configuration {
    @NotNull
    @Min(1)
    private Integer maxTicketCapacity;

    @NotNull
    @Min(1)
    private Integer totalTickets;

    @NotNull
    @Min(1)
    private Integer ticketReleaseRate;

    @NotNull
    @Min(1)
    private Integer customerRetrievalRate;

    // Getters and Setters

    /**
     * Gets the total number of tickets.
     * @return the total number of tickets
     */
    public Integer getTotalTickets() {
        return totalTickets;
    }

    /**
     * Sets the total number of tickets.
     * @param totalTickets the total number of tickets
     */
    public void setTotalTickets(int totalTickets) {
        this.totalTickets = totalTickets;
    }

    /**
     * Gets the ticket release rate.
     * @return the ticket release rate
     */
    public Integer getTicketReleaseRate() {
        return ticketReleaseRate;
    }

    /**
     * Sets the ticket release rate.
     * @param ticketReleaseRate the ticket release rate
     */
    public void setTicketReleaseRate(Integer ticketReleaseRate) {
        this.ticketReleaseRate = ticketReleaseRate;
    }

    /**
     * Gets the customer retrieval rate.
     * @return the customer retrieval rate
     */
    public Integer getCustomerRetrievalRate() {
        return customerRetrievalRate;
    }

    /**
     * Sets the customer retrieval rate.
     * @param customerRetrievalRate the customer retrieval rate
     */
    public void setCustomerRetrievalRate(int customerRetrievalRate) {
        this.customerRetrievalRate = customerRetrievalRate;
    }

    /**
     * Gets the maximum ticket capacity.
     * @return the maximum ticket capacity
     */
    public Integer getMaxTicketCapacity() {
        return maxTicketCapacity;
    }

    /**
     * Sets the maximum ticket capacity.
     * @param maxTicketCapacity the maximum ticket capacity
     */
    public void setMaxTicketCapacity(int maxTicketCapacity) {
        this.maxTicketCapacity = maxTicketCapacity;
    }

    /**
     * toString method for Configuration
     * @return a string representation of the Configuration object
     */
    @Override
    public String toString() {
        return "Configuration set as " +
                "maxTicketCapacity=" + maxTicketCapacity +
                ", totalTickets=" + totalTickets +
                ", ticketReleaseRate=" + ticketReleaseRate +
                ", customerRetrievalRate=" + customerRetrievalRate;
    }
}