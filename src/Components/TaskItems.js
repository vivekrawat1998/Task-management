import React from 'react';
import { Link } from 'react-router-dom';

const TaskItem = () => {
  
  return (
<div className=''>
    <div className='bg-black text-xl text-white grid  grid-flow-col  p-5'>
         <Link to = "/list" className='hover:text-green' > Check List</Link>
         <Link to = "/add" className='hover:text-green-500' > AddTaskForm </Link>   
    </div>   
</div>
  );
};
export default TaskItem;
