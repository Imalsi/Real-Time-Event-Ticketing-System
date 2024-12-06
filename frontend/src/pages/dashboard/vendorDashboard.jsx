import React, { useState, useEffect } from 'react';

const VendorDashboard = () => {
  const [numberOfTickets, setNumberOfTickets] = useState(0);
  const [ticketCount, setTicketCount] = useState(0);

  useEffect(() => {
    fetchTicketCount();
  }, []);

  const handleAddTickets = () => {
    if (numberOfTickets < 1) {
      alert('Please enter a valid number of tickets to add.');
      return;
    }

    fetch(`/api/tickets/add?numberOfTickets=${numberOfTickets}`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        fetchTicketCount();
      })
      .catch(error => {
        alert(error.message || 'Failed to add tickets, maximum capacity reached or system is not running');
      });
  };

  const handleRemoveTickets = () => {
    if (numberOfTickets < 1) {
      alert('Please enter a valid number of tickets to remove.');
      return;
    }

    fetch(`/api/tickets/remove?numberOfTickets=${numberOfTickets}`, {
      method: 'POST',
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        fetchTicketCount();
      })
      .catch(error => {
        alert(error.message || 'Failed to remove tickets, no tickets available to remove or system is not running');
      });
  };

  const fetchTicketCount = () => {
    fetch('/api/tickets/count')
      .then(response => response.json())
      .then(data => setTicketCount(data))
      .catch(error => console.error('Error fetching ticket count:', error));
  };

  return (
    <>
      <div className="container mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Vendor Dashboard</h2>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold">Current Ticket Count</h3>
          <p className="text-3xl font-bold text-blue-600">{ticketCount}</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Number of Tickets:</label>
            <input
              type="number"
              value={numberOfTickets}
              onChange={(e) => setNumberOfTickets(Number(e.target.value))}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleAddTickets}
              className="flex-1 bg-blue-600 text-white p-2 rounded"
            >
              Add Tickets
            </button>
            <button
              onClick={handleRemoveTickets}
              className="flex-1 bg-red-600 text-white p-2 rounded"
            >
              Remove Tickets
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorDashboard;
