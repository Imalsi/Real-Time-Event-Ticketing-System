import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import Loading from "../components/loading";

function Home() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketReleaseRate, setTicketReleaseRate] = useState(0);
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState(0);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
  const [systemStatus, setSystemStatus] = useState("stopped");
  const [numberOfTicketsToBuy, setNumberOfTicketsToBuy] = useState(1);
  const [role, setRole] = useState("");
  const [limit, setLimit] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setRole(localStorage.getItem("role") || "user");
  }, []);

  useEffect(() => {
    getServerStatus();
    getConfiguration();
    setLimit(role === "vip" ? 10 : 5); // Set limit based on role
  }, [role]);

  const getServerStatus = async () => {
    try {
      const response = await fetch("/api/tickets/status", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const status = await response.text();
      setSystemStatus(status === "running" || status === "stopped" ? status : "stopped");
    } catch (error) {
      console.error("Error fetching server status:", error);
      setSystemStatus("stopped");
    }
  };

  const getConfiguration = async () => {
    try {
      const response = await fetch("/api/tickets/configure", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const config = await response.json();
      setTotalTickets(config.totalTickets || 0);
      setTicketReleaseRate(config.ticketReleaseRate || 0);
      setCustomerRetrievalRate(config.customerRetrievalRate || 0);
      setMaxTicketCapacity(config.maxTicketCapacity || 0);
    } catch (error) {
      console.error("Error fetching configuration:", error);
      setTotalTickets(0);
      setTicketReleaseRate(0);
      setCustomerRetrievalRate(0);
      setMaxTicketCapacity(0);
    }
  };

  const buyTicket = async () => {
    if (numberOfTicketsToBuy > limit) {
      setErrorMessage(`You can only buy up to ${limit} tickets.`);
      return;
    }
    try {
      const response = await fetch(`/api/tickets/buy?numberOfTickets=${numberOfTicketsToBuy}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = await response.text();
      if (response.ok) {
        alert(message);
        getServerStatus();
        getConfiguration(); // Update the ticket count after buying
      } else {
        setErrorMessage(message);
      }
    } catch (error) {
      console.error("Buy ticket error:", error);
      setErrorMessage("Failed to buy ticket");
    }
  };

  const redirectToVIP = () => {
    window.location.href = "/vip";
  };

  if (systemStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Buy Ticket</h2>
        <div className="text-center mb-4">
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Tickets</label>
            <input type="number" value={numberOfTicketsToBuy} onChange={(e) => setNumberOfTicketsToBuy(Number(e.target.value))} required min="1" step="1" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Customer Retrieval Rate: {customerRetrievalRate}</p>
            <p className="text-sm font-medium text-gray-700">Total Cost: {customerRetrievalRate * numberOfTicketsToBuy}</p>
            <p className="text-sm font-medium text-gray-700">Allowed Ticket Buy Count: {limit}</p>
          </div>
          {errorMessage && <div className="text-red-500 text-center mb-4">{errorMessage}</div>}
          <button onClick={buyTicket} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
            Buy Ticket
          </button>
          {role !== "VIP" && (
            <>
              <h2 className="text-center">Become VIP</h2>
              <button onClick={redirectToVIP} className="w-full bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 mt-4">
                Check VIP Benefits
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
