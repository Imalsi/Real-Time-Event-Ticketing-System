import React from 'react';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

function Ticket(props) {
  return (
    <div className="flex items-center">
      <img src={props.image} alt={props.title} className="w-48 h-48 object-cover rounded-lg" />
      <div className="ml-4">
        <h3 className="text-lg font-semibold">{props.title}</h3>
        <p className="text-sm text-gray-500">{props.language}</p>
        <p className="text-sm text-gray-500">
          {props.genre.join(' | ')}
        </p>
        <p className="text-sm text-gray-500">on {formatDate(props.date)}</p>
        <p className="text-sm text-gray-500">at {props.time}</p>
      </div>
    </div>
  );
}

export default Ticket;