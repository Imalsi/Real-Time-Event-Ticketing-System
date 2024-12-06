package com.ticketing.repositories;

import com.ticketing.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * Repository interface for User entities.
 * Extends MongoRepository to provide CRUD operations for User.
 */
public interface UserRepository extends MongoRepository<User, String> {

    /**
     * Finds a User by their email address.
     * @param email the email address of the user
     * @return the User with the specified email address, or null if no user found
     */
    User findByEmail(String email);
}