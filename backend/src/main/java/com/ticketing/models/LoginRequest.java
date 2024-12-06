package com.ticketing.models;

public class LoginRequest {
    private String email;
    private String password;

    // Getters and Setters

    /**
     * Gets the email of the user.
     * @return the email of the user
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the user.
     * @param email the email of the user
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password of the user.
     * @return the password of the user
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the user.
     * @param password the password of the user
     */
    public void setPassword(String password) {
        this.password = password;
    }
}