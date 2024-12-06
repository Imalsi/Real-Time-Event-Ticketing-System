import React from 'react';

function Modal({ isOpen, onClose, children, width, height }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <button
        onClick={onClose}
        className="absolute top-0 right-0 mt-2 ml-2 text-gray-500 hover:text-gray-700 text-7xl z-50"
      >
        &times;
      </button>
      <div className="relative bg-white p-0 rounded-lg shadow-lg w-2/3 h-2/3" style={{ width, height }}>
        {children}
      </div>
    </div>
  );
}

export default Modal;