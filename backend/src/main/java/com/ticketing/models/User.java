package com.ticketing.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private String name;
    private String email;
    private String password;
    private String role = "customer";
    private Date createdAt = new Date();
    private Date updatedAt = new Date();

    // Getters and Setters

    /**
     * Gets the user ID.
     * @return the user ID
     */
    public String getUserId() {
        return userId;
    }

    /**
     * Sets the user ID.
     * @param userId the user ID
     */
    public void setUserId(String userId) {
        this.userId = userId;
    }

    /**
     * Gets the user's name.
     * @return the user's name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the user's name.
     * @param name the user's name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the user's email.
     * @return the user's email
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the user's email.
     * @param email the user's email
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the user's password.
     * @return the user's password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the user's password.
     * @param password the user's password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the user's role.
     * @return the user's role
     */
    public String getRole() {
        return role;
    }

    /**
     * Sets the user's role.
     * @param role the user's role
     */
    public void setRole(String role) {
        this.role = role;
    }

    /**
     * Gets the date the user was created.
     * @return the creation date
     */
    public Date getCreatedAt() {
        return createdAt;
    }

    /**
     * Sets the date the user was created.
     * @param createdAt the creation date
     */
    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    /**
     * Gets the date the user was last updated.
     * @return the last update date
     */
    public Date getUpdatedAt() {
        return updatedAt;
    }

    /**
     * Sets the date the user was last updated.
     * @param updatedAt the last update date
     */
    public void setUpdatedAt(Date updatedAt) {
        this.updatedAt = updatedAt;
    }

    /**
     * Returns a string representation of the user.
     * @return a string representation of the user
     */
    @Override
    public String toString() {
        return "User{" +
                "id='" + userId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}