package com.ticketing.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Vendor {
    @Id
    private int vendorId;
    private int ticketsAdded;

    // Getters and Setters

    /**
     * Gets the vendor ID.
     * @return the vendor ID
     */
    public int getVendorId() {
        return vendorId;
    }

    /**
     * Sets the vendor ID.
     * @param vendorId the vendor ID
     */
    public void setVendorId(int vendorId) {
        this.vendorId = vendorId;
    }

    /**
     * Gets the number of tickets added by the vendor.
     * @return the number of tickets added
     */
    public int getTicketsAdded() {
        return ticketsAdded;
    }

    /**
     * Sets the number of tickets added by the vendor.
     * @param ticketsAdded the number of tickets added
     */
    public void setTicketsAdded(int ticketsAdded) {
        this.ticketsAdded = ticketsAdded;
    }
}