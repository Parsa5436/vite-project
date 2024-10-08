import React, { useState, useEffect } from "react";
import Sidebar from "../../Sidebar/index";
import Navbar from "../../Components/Navbar";
import Modal from "../../Components/Modal/BoardModal";
import { v4 as uuidv4 } from "uuid";
import TaskCol from "../../Components/TaskCol/TaskCol";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardName, setBoardName] = useState("");
  const [selectedBoard, setSelectedBoard] = useState(null);
  const currentUserId = "4710";

  const handleAddTask = (taskData) => {
    const newColumns = { ...columns };
    newColumns[selectedColumn].items.push(taskData);
    setColumns(newColumns);
    updateBoardOnServer(newColumns);
    closeModal();
  };

  useEffect(() => {
    const fetchBoards = async () => {
      const response = await fetch("http://localhost:5173/users");
      const data = await response.json();
      const currentUser = data.find((user) => user.id === currentUserId);
      setBoards(currentUser.boards);
    };
    fetchBoards();
    console.log(boards);
  }, []);

  const addBoard = async () => {
    if (boardName.trim()) {
      const newBoard = {
        id: uuidv4(),
        name: boardName,
        columns: {
          "column-1": {
            name: "To Do",
            items: [],
          },
          "column-2": {
            name: "In Progress",
            items: [],
          },
          "column-3": {
            name: "Done",
            items: [],
          },
        },
      };
      const updatedBoards = [...boards, newBoard];

      await fetch(`http://localhost:5173/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boards: updatedBoards }),
      });

      setBoards(updatedBoards);
      setBoardName("");
      setIsModalOpen(false);
    }
  };

  const updateBoardOnServer = async (updatedBoard) => {
    const updatedBoards = boards.map((board) =>
      board.id === updatedBoard.id ? updatedBoard : board
    );

    try {
      await fetch(`http://localhost:5173/users/${currentUserId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ boards: updatedBoards }),
      });

      setBoards(updatedBoards);
      setSelectedBoard(updatedBoard);
    } catch (error) {
      console.error("Error updating board:", error);
    }
  };

  const handleDeleteBoard = async (boardId) => {
    const updatedBoards = boards.filter((board) => board.id !== boardId);

    await fetch(`http://localhost:5173/users/${currentUserId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ boards: updatedBoards }),
    });

    setBoards(updatedBoards);
    setSelectedBoard(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleSelectBoard = (board) => {
    setSelectedBoard(board);
  };

  const handleSelectHome = () => {
    setSelectedBoard(null);
  };

  return (
    <div className="w-screen h-screen relative">
      <div className="md:pl-[250px] pl-[60px] pr-[20px] pt-[70px] w-full h-full overflow-y-auto flex">
        <Sidebar
          boards={boards}
          onSelectBoard={handleSelectBoard}
          onSelectHome={handleSelectHome}
          handleDeleteBoard={handleDeleteBoard}
        />
        {console.log(selectedBoard)}
        <div className="flex-1">
          <Navbar openModal={openModal} />
          <div className="p-5">
            {selectedBoard ? (
              <div className="border p-4 m-2 bg-gray-300 rounded-lg">
                <div>Board Name: {selectedBoard.name}</div>
                {selectedBoard && (
                  <TaskCol
                    columns={selectedBoard.columns}
                    setColumns={(updatedColumns) => {
                      const updatedBoard = {
                        ...selectedBoard,
                        columns: updatedColumns,
                      };
                      setSelectedBoard(updatedBoard);
                      updateBoardOnServer(updatedBoard);
                    }}
                    updateBoardOnServer={updateBoardOnServer}
                  />
                )}
              </div>
            ) : (
              <div className="text-white">
                Please select a board to view its details.
              </div>
            )}
          </div>
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSubmit={addBoard}
            boardName={boardName}
            setBoardName={setBoardName}
          />
        </div>
      </div>
    </div>
  );
};

export default Boards;
