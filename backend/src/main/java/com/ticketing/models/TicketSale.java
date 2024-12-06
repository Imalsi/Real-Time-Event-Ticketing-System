package com.ticketing.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class TicketSale {
    @Id
    private String ticketId;
    private int customerId;
    private String ticketDetails;

    // Getters and Setters

    /**
     * Gets the ID of the ticket.
     * @return the ticket ID
     */
    public String getTicketId() {
        return ticketId;
    }

    /**
     * Sets the ID of the ticket.
     * @param ticketId the ticket ID
     */
    public void setTicketId(String ticketId) {
        this.ticketId = ticketId;
    }

    /**
     * Gets the ID of the customer.
     * @return the customer ID
     */
    public int getCustomerId() {
        return customerId;
    }

    /**
     * Sets the ID of the customer.
     * @param customerId the customer ID
     */
    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    /**
     * Gets the details of the ticket.
     * @return the ticket details
     */
    public String getTicketDetails() {
        return ticketDetails;
    }

    /**
     * Sets the details of the ticket.
     * @param ticketDetails the ticket details
     */
    public void setTicketDetails(String ticketDetails) {
        this.ticketDetails = ticketDetails;
    }
}