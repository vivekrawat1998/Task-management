import React, { useState } from 'react';
import TaskItem from './TaskItems';
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm = ({ inputData, setInputData, items, setItems }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('');

  const AddTask = () => {
    if (!taskName) {
      alert("Task Name is required");
    } else {
      const newTask = {
        id: uuidv4(),
        taskName: taskName,
        description: description,
        priority: priority,
        completed: false,
      };
      setItems([...items, newTask]);
      setTaskName('');
      setDescription('');
      setPriority('');
    }
  };

  return (
    <>
      <TaskItem />
      <div className='container mx-auto mt-10'>
        <div className='border-2 border-black w-full md:w-[500px] lg:w-[600px] rounded-xl p-5'>
          <h1 className='font-bold text-3xl mt-5'>Add the Task</h1>
          <div className='mb-4'>
            <label className='text-lg font-semibold block'>Task Name</label>
            <input
              className='border-2 w-full rounded-md p-2'
              placeholder='Add Task Name'
              type='text'
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='font-semibold text-lg block'>Description</label>
            <textarea
              className='border-2 w-full rounded-md p-2'
              placeholder='Add Task Description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type='text'
            />
          </div>
          <div className='mb-4'>
            <label className='font-semibold text-lg block'>Priority</label>
            <select
              className='border-2 w-full rounded-md p-2'
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value='' disabled>Select Priority</option>
              <option value='low'>Low</option>
              <option value='medium'>Medium</option>
              <option value='high'>High</option>
            </select>
          </div>
          <button
            className='border-2 border-black bg-black text-white rounded-md hover:bg-green-400 w-full'
            onClick={AddTask}
          >
            Add Task Items
          </button>
        </div>
      </div>
    </>
  );
};

export default AddTaskForm;
