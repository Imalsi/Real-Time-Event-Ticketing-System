import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import Loading from "../components/loading";

function Home() {
  const [totalTickets, setTotalTickets] = useState(0);
  const [ticketReleaseRate, setTicketReleaseRate] = useState(0);
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState(0);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(0);
  const [systemStatus, setSystemStatus] = useState("stopped");

  useEffect(() => {
    getServerStatus();
    getConfiguration();
  }, []);

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

  const startSystem = async () => {
    try {
      const response = await fetch("/api/tickets/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = await response.text();
      setSystemStatus("running");
      alert(message || "System started successfully");
      getServerStatus();
    } catch (error) {
      console.error("Start system error:", error);
      alert("Failed to start system");
    }
  };

  const stopSystem = async () => {
    try {
      const response = await fetch("/api/tickets/stop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const message = await response.text();
      setSystemStatus("stopped");
      alert(message || "System stopped successfully");
      getServerStatus();
    } catch (error) {
      console.error("Stop system error:", error);
      alert("Failed to stop system");
    }
  };

  const configureSystem = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/tickets/configure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalTickets,
          ticketReleaseRate,
          customerRetrievalRate,
          maxTicketCapacity,
        }),
      });
      const message = await response.text();
      alert(message);
      getServerStatus();
    } catch (error) {
      console.error("Configuration error:", error);
      alert("Configuration failed");
    }
  };

  if (systemStatus === "loading") {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">Ticketing System Configuration</h2>
        <div className="mb-6 text-center">
          <p className="text-xl">
            System Status:{" "}
            <span className={`font-bold ${systemStatus === "running" ? "text-green-500" : "text-red-500"}`}>
              {systemStatus.toUpperCase()}
            </span>
          </p>
        </div>
        <form onSubmit={configureSystem} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Tickets</label>
              <input
                type="number"
                value={totalTickets}
                onChange={(e) => setTotalTickets(Number(e.target.value))}
                required
                min="0"
                step="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ticket Release Rate</label>
              <input
                type="number"
                value={ticketReleaseRate}
                onChange={(e) => setTicketReleaseRate(Number(e.target.value))}
                required
                min="0"
                step="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Customer Retrieval Rate</label>
              <input
                type="number"
                value={customerRetrievalRate}
                onChange={(e) => setCustomerRetrievalRate(Number(e.target.value))}
                required
                min="0"
                step="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Max Ticket Capacity</label>
              <input
                type="number"
                value={maxTicketCapacity}
                onChange={(e) => setMaxTicketCapacity(Number(e.target.value))}
                required
                min="0"
                step="1"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4">
            Configure
          </button>
        </form>
        <div className="mt-6 flex justify-center space-x-4">
          <button
            onClick={startSystem}
            disabled={systemStatus === "running"}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start
          </button>
          <button
            onClick={stopSystem}
            disabled={systemStatus === "stopped"}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Stop
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;