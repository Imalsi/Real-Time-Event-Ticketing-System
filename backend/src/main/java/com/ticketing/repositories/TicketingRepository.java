package com.ticketing.repositories;

import com.ticketing.models.TicketSale;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for TicketSale entities.
 * Extends MongoRepository to provide CRUD operations for TicketSale.
 */
public interface TicketingRepository extends MongoRepository<TicketSale, String> {
    // Custom queries can be added here if needed
}