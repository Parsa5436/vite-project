export const onDragEnd = (result, columns, setColumns) => {
	if (!result.destination) return;
  
	const { source, destination } = result;
  
	// Moving within the same column
	if (source.droppableId === destination.droppableId) {
	  const column = columns[source.droppableId];
	  const copiedItems = [...column.items];
	  const [removed] = copiedItems.splice(source.index, 1);
	  copiedItems.splice(destination.index, 0, removed);
  
	  setColumns({
		...columns,
		[source.droppableId]: {
		  ...column,
		  items: copiedItems,
		},
	  });
	} else {
	  // Moving to a different column
	  const sourceColumn = columns[source.droppableId];
	  const destColumn = columns[destination.droppableId];
	  const sourceItems = [...sourceColumn.items];
	  const destItems = [...destColumn.items];
	  const [removed] = sourceItems.splice(source.index, 1);
	  destItems.splice(destination.index, 0, removed);
  
	  setColumns({
		...columns,
		[source.droppableId]: {
		  ...sourceColumn,
		  items: sourceItems,
		},
		[destination.droppableId]: {
		  ...destColumn,
		  items: destItems,
		},
	  });
	}
  };