package com.ticketing.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketing.models.User;
import com.ticketing.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Retrieves all users.
     * @return a list of all users
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their ID.
     * @param id the ID of the user to be retrieved
     * @return an Optional containing the user if found, or empty if not found
     */
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    /**
     * Logs in a user with the provided email and password.
     * @param email the email of the user
     * @param password the password of the user
     * @return the logged-in user if credentials are valid
     * @throws RuntimeException if the email or password is incorrect
     */
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && password.equals(user.getPassword())) {
            return user;
        } else {
            throw new RuntimeException("Invalid email or password");
        }
    }

    /**
     * Creates a new user.
     * @param user the user to be created
     * @return the created user
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Updates an existing user.
     * @param id the ID of the user to be updated
     * @param userDetails the new details of the user
     * @return the updated user
     * @throws RuntimeException if the user with the specified ID is not found
     */
    public User updateUser(String id, User userDetails) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        user.setPassword(userDetails.getPassword());
        user.setRole(userDetails.getRole());
        user.setUpdatedAt(new java.util.Date());
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their ID.
     * @param id the ID of the user to be deleted
     * @throws RuntimeException if the user with the specified ID is not found
     */
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new RuntimeException("User not found");
        }
        userRepository.deleteById(id);
    }

    /**
     * Finds a user by their email address.
     * @param email the email address of the user
     * @return the user with the specified email address, or null if no user found
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}