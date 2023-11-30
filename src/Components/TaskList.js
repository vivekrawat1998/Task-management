import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItems';

const TaskList = ({ items = [], setItems }) => {
  const itemsPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');
  const [editedTaskDescription, setEditedTaskDescription] = useState('');
  const [editedTaskPriority, setEditedTaskPriority] = useState('');

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setCurrentItems(items.slice(startIndex, endIndex));
  }, [items, currentPage]);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleEditClick = (taskId) => {
    const taskToEdit = items.find((item) => item.id === taskId);
    setEditingTask(taskToEdit);
    setEditedTaskName(taskToEdit.taskName);
    setEditedTaskDescription(taskToEdit.description);
    setEditedTaskPriority(taskToEdit.priority);
  };

  const handleSaveEdit = () => {
    const updatedTask = {
      ...editingTask,
      taskName: editedTaskName,
      description: editedTaskDescription,
      priority: editedTaskPriority,
    };
    const updatedItems = items.map((item) =>
      item.id === editingTask.id ? updatedTask : item
    );
    setItems(updatedItems);
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = (taskId) => {
    const updatedItems = items.filter((item) => item.id !== taskId);
    setItems(updatedItems);
  };

  const handleCheckboxChange = (taskId) => {
    const updatedItems = items.map((item) =>
      item.id === taskId ? { ...item, completed: !item.completed } : item
    );
    setItems(updatedItems);
  };

  return (
    <div>
      <TaskItem />
      <div className='container mx-auto mt-10'>
        <h1 className='text-3xl mb-5 font-bold'>Task List</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {currentItems.map((element) => (
            <div key={element.id} className={`bg-yellow-500 border-white rounded-md p-2 m-2 ${element.completed ? 'bg-green-500' : ''}`}>
              <h1>TaskName: {element.taskName}</h1>
              <p>Description: {element.description}</p>
              <p>Priority: {element.priority}</p>
              <label>
                <input
                  type='checkbox'
                  checked={element.completed}
                  onChange={() => handleCheckboxChange(element.id)}
                />
                {element.completed ? 'Completed' : ""}
              </label>
              <div className='flex justify-between'>
                <button className='bg-black text-white w-[100px] rounded-md hover:bg-green-500' onClick={() => handleEditClick(element.id)}>Edit</button>
                <button className='bg-black text-white w-[100px] rounded-md hover:bg-green-500' onClick={() => handleDelete(element.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-10 flex justify-center'>
          <button
            className='bg-black text-white p-2 mr-5 rounded-md hover:bg-green-500 cursor-pointer'
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className=''>{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className='bg-black text-white p-2 rounded-md hover:bg-green-500 cursor-pointer ml-5'
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {editingTask && (
        <div className='absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] mx-auto mt-10'>
          <div className='border-2 border-black bg-black rounded-xl p-5'>
            <h1 className='font-bold text-3xl mb-5 text-white'>Edit Task</h1>
            <div>
              <h1 className='text-lg font-semibold text-white'>Task Name</h1>
              <input
                className='border-2 w-full rounded-md p-2'
                type='text'
                value={editedTaskName}
                onChange={(e) => setEditedTaskName(e.target.value)}
              />
            </div>
            <div>
              <h1 className='font-semibold text-lg text-white'>Description</h1>
              <textarea
                className='border-2 w-full rounded-md p-2'
                value={editedTaskDescription}
                onChange={(e) => setEditedTaskDescription(e.target.value)}
                type='text'
              />
            </div>
            <div className='mb-4'>
            <label className='font-semibold text-lg block'>Priority</label>
            <select
              className='border-2 w-full rounded-md p-2'
              value={editedTaskPriority}
              onChange={(e) => setEditedTaskPriority(e.target.value)}
            >
              <option value='' disabled>Select Priority</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>
            <div className='flex justify-center mt-5'>
              <button
                className='border-2 border-black bg-black text-white rounded-md hover:bg-green-400 mr-3'
                onClick={handleSaveEdit}
              >
                Save Changes
              </button>
              <button
                className='border-2 border-black bg-black text-white rounded-md hover:bg-green-400'
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList
