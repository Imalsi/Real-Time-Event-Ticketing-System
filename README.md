<!-- ```markdown -->
# Real-Time Event Ticketing System

## Introduction

The Real-Time Event Ticketing System is a simulation of a ticketing platform that handles concurrent ticket releases and purchases using multithreading and synchronization mechanisms. It demonstrates the implementation of the Producer-Consumer pattern in a multi-threaded environment, managing resources efficiently while ensuring data integrity.

## Features

- **Command-Line Interface (CLI):** Interact with the system through a user-friendly CLI for configuring events, creating users, and running simulations.
- **Multithreaded Simulation:** Simulate vendors adding tickets and customers purchasing tickets concurrently.
- **Thread Safety:** Utilize thread-safe classes and synchronization techniques to handle concurrent access to shared resources.
- **Logging and Validation:** Implement logging for monitoring system activities and input validation for robustness.
- **Event Management:** Create, update, and configure events with details like total tickets, ticket price, and customer retrieval rate.

## Technologies Used

- **Java 8 or higher**
- **Spring Boot**
- **Maven**
- **React**
- **Vite**

## Requirements

- **Java Development Kit (JDK) 8 or higher**
- **Apache Maven**
- **Node.js and npm**
- **Remote MongoDB instance**

## Setup Instructions

### Clone the Repository

```bash
git clone <repository-url>
cd ticketing-system
```

### Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

```env
MONGO_URI=<your-remote-mongodb-uri>
```

### Build the Backend

```bash
cd backend
mvn clean install
```

### Run the Backend

```bash
mvn spring-boot:run
```

### Build the Frontend

```bash
cd frontend
npm install
```

### Run the Frontend

```bash
npm run dev
```

## Usage Instructions

Upon running the application, the CLI will present the following menu:

```
1. Create User
2. Find User by Email
3. Configure System
4. Run Simulation
5. Exit
Enter your choice:
```

### 1. Create User

- **Description:** Create a new user in the system.
- **Steps:**
  - Select option **1**.
  - Enter the user's name, email, password, and role when prompted.

### 2. Find User by Email

- **Description:** Search for a user by their email address.
- **Steps:**
  - Select option **2**.
  - Enter the email address of the user when prompted.

### 3. Configure System

- **Description:** Configure event parameters before running the simulation.
- **Steps:**
  - Select option **3**.
  - Enter the event ID to configure.
  - If the event exists, provide the following details when prompted:
    - Total Number of Tickets
    - Ticket Price
    - Customer Retrieval Rate
    - Maximum Ticket Capacity

### 4. Run Simulation

- **Description:** Simulate vendors adding tickets and customers purchasing tickets concurrently.
- **Steps:**
  - Select option **4**.
  - The simulation will start automatically, demonstrating concurrent operations.
  - Upon completion, the system will display the remaining tickets in the pool.

### 5. Exit

- **Description:** Exit the application.
- **Steps:**
  - Select option **5**.

## Project Structure

```
backend/
├── src/main/java/ticketing/backend
│   ├── cli
│   │   └── CliInterface.java        // CLI interaction logic
│   ├── controllers
│   │   └── TicketPool.java          // Manages ticket pool with thread safety
│   ├── models
│   │   ├── Customer.java            // Customer thread simulation
│   │   ├── Vendor.java              // Vendor thread simulation
│   │   └── Event.java               // Event model
│   ├── repositories
│   │   └── UserRepository.java      // Data access for users
│   ├── services
│   │   ├── UserService.java         // Business logic for users
│   │   └── EventService.java        // Business logic for events
│   └── Application.java             // Spring Boot application entry point
frontend/
├── src
│   ├── components
│   │   ├── footer.jsx
│   │   └── navbar.jsx
│   ├── pages
│   │   ├── dashboard
│   │   │   ├── adminDashboard.jsx
│   │   │   ├── customerDashboard.jsx
│   │   │   └── vendorDashboard.jsx
│   │   ├── home.jsx
│   │   ├── login.jsx
│   │   ├── profile.jsx
│   │   ├── register.jsx
│   │   └── VIP.jsx
│   ├── styles
│   │   ├── tailwind.css
│   │   └── output.css
│   ├── main.jsx
│   └── App.jsx
└── vite.config.js
```

## Logging and Validation

- **Logging:** The system uses `java.util.logging.Logger` to log important operations and errors for `EventService` and `UserService`.
- **Validation:** Input validation is implemented in service classes to ensure data integrity before processing.

## Threading Mechanism

- **ExecutorService:** Manages a pool of threads to execute vendor and customer tasks concurrently.
- **Vendor and Customer Classes:** Implement the `Runnable` interface to allow concurrent execution.

## Notes

- Ensure that your Java and Maven versions are compatible with the project requirements.
- The application runs in a console environment; no graphical user interface is provided.
- Sample data and configurations are used in the simulation for demonstration purposes.

## License

This project is for educational purposes and does not have a specified license.
```