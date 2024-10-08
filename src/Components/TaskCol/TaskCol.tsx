import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IoAddOutline } from "react-icons/io5";
import Task from "../../Components/Navbar/Task";
import AddModal from "../../Components/Modal/Addmodal";
import { onDragEnd } from "../../Helpers/onDragEnd/index";

const TaskCol = ({ columns, setColumns, updateBoardOnServer }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedColumn, setSelectedColumn] = React.useState("");

  const openModal = (columnId) => {
    setSelectedColumn(columnId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleAddTask = (taskData) => {
    const newColumns = { ...columns };
    newColumns[selectedColumn].items.push(taskData);
    setColumns(newColumns);
    closeModal();
  };

  return (
    <>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result, columns, setColumns);
          updateBoardOnServer({ ...selectedBoard, columns });
        }}
      >
        <div className="w-full flex items-start justify-between px-5 pb-8 md:gap-3">
          {Object.entries(columns).map(([columnId, column]) => (
            <div className="w-full flex flex-col gap-0" key={columnId}>
              <Droppable droppableId={columnId} key={columnId}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col md:w-[290px] w-[250px] gap-3 items-center py-5"
                  >
                    <div className="flex items-center justify-center py-[10px] w-full bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]">
                      {column.name}
                    </div>
                    {column.items.map((task, index) => (
                      <Draggable
                        key={task.id.toString()}
                        draggableId={task.id.toString()}
                        index={index}
                      >
                        {(provided) => <Task provided={provided} task={task} />}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div
                onClick={() => openModal(columnId)}
                className="flex cursor-pointer items-center justify-center gap-1 py-[10px] md:w-[90%] w-full opacity-90 bg-white rounded-lg shadow-sm text-[#555] font-medium text-[15px]"
              >
                <IoAddOutline color={"#555"} />
                Add Task
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>

      <AddModal
        isOpen={modalOpen}
        onClose={closeModal}
        setOpen={setModalOpen}
        handleAddTask={handleAddTask}
      />
    </>
  );
};

export default TaskCol;
