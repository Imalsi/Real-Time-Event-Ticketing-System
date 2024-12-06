package com.ticketing.repositories;

import com.ticketing.models.Vendor;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for Vendor entities.
 * Extends MongoRepository to provide CRUD operations for Vendor.
 */
public interface VendorRepository extends MongoRepository<Vendor, String> {
    // Custom queries can be added here if needed
}