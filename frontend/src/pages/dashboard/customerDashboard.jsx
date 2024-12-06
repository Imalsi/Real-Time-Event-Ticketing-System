import React, { useState, useEffect } from "react";
import Loading from "../../components/loading";

const CustomerDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const response = await fetch(`/api/tickets/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data); // Set the fetched data to the tickets state
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message); // Set the error message to the error state
      }
    };

    fetchTickets();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-center text-red-500 font-bold">{error}</p>
      </div>
    );
  }

  if (tickets.length === 0) {
    return <Loading />;
  } else if (tickets.message === "No tickets found") {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <p className="text-center text-red-500 font-bold">No tickets found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Customer Dashboard</h1>
        {tickets
          .sort((a, b) => {
            const dateA = new Date(a.bookedDate); // Directly use bookedDate, assuming it's already ISO 8601 format
            const dateB = new Date(b.bookedDate); // Same here
            return dateB - dateA; // Sorting in descending order (latest first)
          })
          .map((ticket) => (
            <div key={ticket._id} className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50 text-black flex flex-col md:flex-row">
              <div className="w-full md:w-40 mb-4 md:mb-0 order-1 md:order-2">
                <img src={ticket.image || "https://via.placeholder.com/150"} alt={ticket.event} className="w-full md:w-40 object-cover rounded-lg" />
              </div>
              <div className="md:pl-4 order-2 md:order-1 flex-1">
                <p>Ticket ID: {ticket.ticketId}</p>
                <p className="text-lg font-semibold">{ticket.event}</p>
                <p>Event Name: {ticket.eventName}</p>
                <p>Time: {ticket.time}</p>
                <p>Venue: {ticket.venue}</p>
                <p>
                  Seat Number: <b>{ticket.seatNumber}</b>
                </p>
                <p>Date: {formatDate(ticket.date)}</p>
                <p>Price: ${ticket.price}</p>
                <p>Customer Name: {ticket.customerName}</p>
                <p>Customer Email: {ticket.customerEmail}</p>
                <p>Booked Date: {formatDate(ticket.bookedDate)}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CustomerDashboard;
