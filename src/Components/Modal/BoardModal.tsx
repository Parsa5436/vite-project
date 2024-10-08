import React from 'react';

const AddBoardModal = ({ isOpen, onClose, onSubmit, boardName, setBoardName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96">
        <h2 className="text-xl mb-4">Enter your board name</h2>
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
          placeholder="Board Name"
        />
        <div className="flex justify-end mt-4 ">
          <button onClick={onSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            Create
          </button>
          <button onClick={onClose} className="bg-gray-300 text-gray-700 px-4 py-2 rounded ml-2">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBoardModal;
