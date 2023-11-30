import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import TaskList from './Components/TaskList';
import AddTaskForm from './Components/AddTaskForm';
import TaskItem from './Components/TaskItems';
import { Fragment,useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [items, setItemsMain] = useState([]);
  const [inputData, setInputData] = useState({
    taskName: '',
    description: '',
    priority: ''
  });

  const setItems = (items)=>{
    localStorage.setItem('items', JSON.stringify(items));
    let localItems = JSON.parse(localStorage.getItem('items'));
    setItemsMain(localItems)
  }
  useEffect(() => {
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route path='/' element={<TaskItem   />}/>
          <Route path="/list" element={<TaskList items={items} setItems={setItems} />} />
          <Route path="/add" element={<AddTaskForm inputData={inputData} setInputData={setInputData} items={items} setItems={setItems} />} />
        </Routes>
      </Router>
    </Fragment>

  );
}

export default App;
