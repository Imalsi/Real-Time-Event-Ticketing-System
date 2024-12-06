package com.ticketing.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;

@Configuration
public class MongodbConfig extends AbstractMongoClientConfiguration {

    /**
     * Returns the name of the MongoDB database to use.
     * @return the database name
     */
    @Override
    protected String getDatabaseName() {
        return "test"; // Replace with your database name
    }

    /**
     * Creates and configures a MongoClient bean to connect to the MongoDB instance.
     * The MongoDB URI is loaded from environment variables using Dotenv.
     * @return the configured MongoClient instance
     */
    @Bean
    public MongoClient mongoClient() {
        Dotenv dotenv = Dotenv.configure().load();
        String mongoUri = dotenv.get("MONGO_URI");
        return MongoClients.create(mongoUri);
    }
}